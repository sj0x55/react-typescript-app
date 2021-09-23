import fs from 'fs';
import nodemailer from 'nodemailer';
import { join } from 'path';
import { fetchContent, arrayToObject } from './utils.mjs';
import { __dirname } from './node.js';

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
  } catch (err) {}

  try {
    fs.writeFileSync(join(dataDir, `${name}-data.json`), JSON.stringify(data || [], null, '  '));
  } catch (err) {
    console.error(`${err}`);
  }
};

export const fetchData = async (baseUrl, pathes, featureMap) => {
  return (await Promise.all(pathes.map((url) => fetchDataFromWishList(baseUrl, url, featureMap)))).flat();
};

export async function fetchDataFromWishList(baseUrl, pathUrl, featureMap = {}) {
  const allData = [];
  const content = await fetchContent(`${baseUrl}${pathUrl}`);
  const getElementContent = (element, selector) => element.find(selector).text().trim();
  const getElementAttr = (element, selector, attrName) => (element.find(selector).attr(attrName) || '').trim();
  const priceToNumber = (price) => {
    const normalize = (price, regExp) => {
      const matched = price.match(regExp);

      if (matched) {
        return `${matched[1].replace(/[,.]/gi, '')}.${matched[2]}`;
      }
    };

    price = `${price}`
      .trim()
      .replace(' ', '')
      .replace(/[^0-9.,]+/, '');
    price = normalize(price, /(\d+(?:,\d+)+)(?:\.(\d+))?/) || price;
    price = price || normalize(price, /(\d+(?:\.\d+)+)(?:,(\d+))?/);

    return parseFloat(price || 0);
  };
  const spanContentToText = (spanContent) => spanContent.replace(/[/\n\s]+/gi, ' ').trim();
  const createProductFactory = (productData, features) => (condition, price, productExtraData) => ({
    ...productData,
    ...productExtraData,
    condition,
    features,
    price: priceToNumber(price),
  });

  content('[id^="itemInfo_"]').each((_, item) => {
    const itemInfoElement = content(item);
    const dataInfoElement = itemInfoElement.find('[data-item-prime-info]');
    const itemId = ((itemInfoElement.attr('id') || '').match(/^itemInfo_(.+)/) || [])[1];
    const imageSrc = content(`[id="itemImage_${itemId}"]`).find('img').attr('src');
    const productData = {
      title: getElementContent(itemInfoElement, `#itemName_${itemId}`),
      image: imageSrc,
    };
    const productFeatures = {};
    const priceForNew = getElementContent(itemInfoElement, `#itemPrice_${itemId} > span:first-child`);
    const linkForNew = getElementAttr(itemInfoElement, `#itemName_${itemId}`, 'href');
    const priceForUsed = getElementContent(itemInfoElement, '.itemUsedAndNew > .itemUsedAndNewPrice');
    const linkForUsed = getElementAttr(itemInfoElement, '.itemUsedAndNew > .itemUsedAndNewLink', 'href');
    const spanElements = itemInfoElement
      .find('span:not(:has(*))')
      .map((_, span) => {
        Object.entries(featureMap).forEach(([key, rexExp]) => {
          const spanText = spanContentToText(content(span).text());

          const matched = spanText.match(rexExp[0] || rexExp);
          const matchedValue = matched && (rexExp[1] ? rexExp[1](matched[1]) : matched[1].trim());

          if (!productFeatures[key] && matchedValue) {
            productFeatures[key] = matchedValue;
          }
        });
      })
      .toArray();

    const productFactory = createProductFactory(productData, productFeatures);

    if (priceForNew) {
      allData.push(productFactory('new', priceForNew, { href: linkForNew }));
    }

    if (priceForUsed && priceForUsed !== priceForNew) {
      allData.push(productFactory('used', priceForUsed, { href: linkForUsed }));
    }
  });

  return allData;
}

export const mergeData = (currPoductData, newProductData) => {
  const currPoductDataObj = arrayToObject(['condition', 'href'], currPoductData);
  const newProductDataObj = arrayToObject(['condition', 'href'], newProductData);
  const productsWithProceDropped = [];

  Object.entries(newProductDataObj).forEach(([key, newItem]) => {
    const currentItem = currPoductDataObj[key] || {};
    const prevPrice = parseFloat(currentItem.prevPrice || 0);
    const currTimestampChanged = currentItem.timestampChanged || Date.now();
    const currPrice = parseFloat(currentItem.price || 0);
    const newPrice = parseFloat(newItem.price || 0);

    if (currPrice && newPrice != currPrice) {
      newProductData[newItem.index].isPriceChanged = true;
      newProductData[newItem.index].timestampChanged = Date.now();

      if (newPrice < currPrice) {
        newProductData[newItem.index].prevPrice = currPrice;
      } else if (newPrice > currPrice || newPrice >= prevPrice) {
        newProductData[newItem.index].prevPrice = null;
      } else {
        newProductData[newItem.index].prevPrice = prevPrice;
      }
    } else {
      newProductData[newItem.index].isPriceChanged = false;
      newProductData[newItem.index].timestampChanged = currTimestampChanged;
      newProductData[newItem.index].prevPrice = prevPrice || null;
    }
  });

  return newProductData;
};

export const calcPriceChangePercentages = (prevPrice, newPrice) => {
  return parseFloat((1 - newPrice / prevPrice) * 100);
};

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
