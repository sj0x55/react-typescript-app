import terminus from '@godaddy/terminus';
import http from 'http';
import kill from 'kill-port';
import axios from 'axios';
import cheerio from 'cheerio';
import userAgents from './user-agents.mjs';

export async function killPort(port) {
  if (process.env.NODE_ENV === 'development') {
    try {
      await kill(port); // After re-run the server during the watch mode the port may be busy.
    } catch (err) {
      console.error(err);
    }
  }
}

export function getCorsConfig(ipAddress) {
  return {
    origin: (origin, callback) => {
      if (new RegExp(`(http|http)://(localhost|127.0.0.1|${ipAddress})`).test(origin)) {
        callback(null, [origin]);
      }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  };
}

export async function listenServer(app, port, callback) {
  const server = http.createServer(app);
  const onSignal = async () => {
    console.log('Server is starting cleanup');
  };
  const onShutdown = async () => {
    console.log('Cleanup finished, server is shutting down');
  };

  terminus.createTerminus(server, { signal: 'SIGINT', onSignal, onShutdown, logger: console.error });
  server.listen(port, '0.0.0.0', callback);
}

export async function fetchContent(url) {
  try {
    const userAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
    const result = await axios.get(url, {
      params: {
        t: new Date().getTime(),
      },
      headers: {
        Pragma: 'no-cache',
        Expires: '0',
        'Cache-Control': 'no-cache',
        'User-Agent': userAgent,
      },
    });

    return await cheerio.load(result.data);
  } catch (err) {
    console.error(err);
    return await cheerio.load('');
  }
}

export async function fetchAllDataFromWishList(baseUrl, pathUrl) {
  const parsePrice = (price) => (price && price.trim().replace(/[^0-9.]+/, '')) || 0;
  const prepareProduct = (product) => (condition, price) => ({
    ...product,
    condition,
    price: parseFloat(price),
  });
  const data = [];
  const content = await fetchContent(`${baseUrl}${pathUrl}`);

  content('[id^="itemInfo_"]').each((i, item) => {
    const dataInfoElement = content(item).find('[data-item-prime-info]');
    const { id, asin } = JSON.parse(dataInfoElement.attr('data-item-prime-info') || '{}');

    if (asin) {
      const title = content(item).find(`#itemName_${id}`).text().trim();
      const href = content(item).find(`#itemName_${id}`).attr('href').trim().split('?')[0];
      const priceForNew = parsePrice(content(item).find(`#itemPrice_${id} > span:first-child`).text());
      const priceForUsed = parsePrice(content(item).find('.itemUsedAndNew > .itemUsedAndNewPrice').text());
      const capacity = content(item)
        .find('span:not(:has(*))')
        .map((j, span) => {
          const spanText = content(span).text().replace(/\s+/g, ' ').trim();
          const matchedCapacity = spanText.match(/^Capacity\s?:\s?(\d+)\s?TB/i);

          return (matchedCapacity && parseInt(matchedCapacity[1])) || null;
        })
        .toArray()
        .find(Number);

      if (capacity) {
        const cProduct = prepareProduct({
          url: `${baseUrl}${href}`,
          title,
          capacity,
        });

        if (priceForNew) {
          data.push(cProduct('new', priceForNew));
        }

        if (priceForUsed) {
          data.push(cProduct('used', priceForUsed));
        }
      }
    }
  });

  return data;
}

export const arrayToObject = (propKeyNames, items) => {
  const obj = {};
  const genKey = (item) =>
    [propKeyNames]
      .flat()
      .map((key) => (item[key] || '').replace(/[^a-z0-9]+/gi, '-'))
      .filter((val) => val)
      .join('-');

  items.forEach((item, index) => {
    obj[genKey(item)] = { ...item, index };
  });

  return obj;
};
