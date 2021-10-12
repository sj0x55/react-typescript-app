import fs from 'fs';
import nodemailer from 'nodemailer';
import { join } from 'path';
import { __dirname } from '../node.js';
import { fetchContent, normalizeWhitespaces, priceToNumber } from '../utils.mjs';
import { productFactory, productsFactory, parseFeatureMap } from './data-parser.mjs';

const dataDir = join(__dirname, 'data');

export const loadData = (name) => {
  try {
    return JSON.parse(fs.readFileSync(join(dataDir, `${name}-data.json`)));
  } catch (err) {
    console.error(`${err}`);
    return [];
  }
};

export const saveData = (name, data) => {
  try {
    fs.mkdirSync(dataDir);
  } catch (err) {
    console.error(`${err}`);
  }

  try {
    fs.writeFileSync(join(dataDir, `${name}-data.json`), JSON.stringify(data || [], null, '  '));
  } catch (err) {
    console.error(`${err}`);
  }
};

export const fetchData = async (baseUrl, pathes, featureMap) => {
  return (await Promise.all(pathes.map((url) => fetchDataFromWishList(baseUrl, url, featureMap)))).flat();
};

// TODO: Move to separate file (./libs/content-parser.mjs)
export async function fetchDataFromWishList(baseUrl, pathUrl, featureMap = {}) {
  const allData = [];
  const urlFactory = (path) => `${baseUrl}${path}`;
  const content = await fetchContent(urlFactory(pathUrl));
  const getElementContent = (element, selector) => element.find(selector).text().trim();
  const getElementAttr = (element, selector, attrName) => (element.find(selector).attr(attrName) || '').trim();

  content('[id^="itemInfo_"]').each((_, item) => {
    const itemInfoElement = content(item);
    const dataInfoElement = itemInfoElement.find('[data-item-prime-info]');
    const itemId = ((itemInfoElement.attr('id') || '').match(/^itemInfo_(.+)/) || [])[1];
    const image = content(`[id="itemImage_${itemId}"]`).find('img').attr('src');
    const title = getElementContent(itemInfoElement, `#itemName_${itemId}`);
    const priceForNew = getElementContent(itemInfoElement, `#itemPrice_${itemId} > span:first-child`);
    const linkForNew = getElementAttr(itemInfoElement, `#itemName_${itemId}`, 'href');
    const priceForUsed = getElementContent(itemInfoElement, '.itemUsedAndNew > .itemUsedAndNewPrice');
    const linkForUsed = getElementAttr(itemInfoElement, '.itemUsedAndNew > .itemUsedAndNewLink', 'href');
    const productFeatures = {};

    itemInfoElement.find('span:not(:has(*))').map((_, span) => {
      const spanText = normalizeWhitespaces(content(span).text());
      const parsedFeatures = parseFeatureMap(featureMap, spanText);

      Object.assign(productFeatures, parsedFeatures);
    });

    allData.push(
      ...productsFactory(
        {
          title,
          image,
        },
        productFeatures,
      )([
        priceForNew && {
          condition: 'new',
          price: priceForNew,
          extraData: {
            href: urlFactory(linkForNew),
          },
        },
        priceForUsed &&
          priceForUsed !== priceForNew && {
            condition: 'used',
            price: priceForUsed,
            extraData: {
              href: urlFactory(linkForUsed),
            },
          },
      ]),
    );
  });

  return allData;
}

export const sendEmail = ({ to, subject, html }) => {
  try {
    nodemailer
      .createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.GMAIL_AUTH_USERNAME,
          pass: process.env.GMAIL_AUTH_PASSWORD,
        },
      })
      .sendMail({ from: process.env.GMAIL_AUTH_USERNAME, to, subject, html }, (err, info) => {
        err && console.log(err);
        console.log(info);
      });
  } catch (err) {
    console.log(err);
  }
};
