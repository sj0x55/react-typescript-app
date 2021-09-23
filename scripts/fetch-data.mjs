import fs from 'fs';
import dotenv from 'dotenv';
import lodash from 'lodash';
import { join } from 'path';
import {
  calcPriceChangePercentages,
  loadData,
  saveData,
  fetchData,
  mergeData,
  sendEmail,
} from '../src/server/data-loader.mjs';
import { createTransport } from 'nodemailer';

(async () => {
  dotenv.config();

  const baseAmazonUrl = 'https://www.amazon.co.uk';
  const urlQuery = '?filter=unpurchased&sort=price-asc';
  const createEmailContentItems = (items, extraInfoFn = null, validatorFn = null) =>
    items
      .filter((item) => item.isPriceChanged && item.price < item.prevPrice)
      .map((item) => {
        const { title, href, price, prevPrice } = item;
        const percentagesThreshold = 5;
        const isMoreThanThreshold = calcPriceChangePercentages(prevPrice, price) >= percentagesThreshold;
        const isValid = !validatorFn || validatorFn(item);

        if (isMoreThanThreshold && isValid) {
          return [
            `<div>`,
            `<div><strong>[${title}]</strong></div>`,
            `<div><strong>Price change:</strong> <strike>£${prevPrice}</strike> > £${price}</div>`,
            `${extraInfoFn ? `<div>${extraInfoFn(item)}</div>` : ''}`,
            `<div><strong>Link:</strong> ${baseAmazonUrl}${href}</div>`,
            `</div>`,
          ]
            .flat()
            .filter((val) => val)
            .join('\n');
        }
      })
      .filter((val) => val);

  const fetchDataByType = async (type, pathes, featureMap = null, extraInfoFn = null, validatorFn = null) => {
    const data = mergeData(loadData(type), await fetchData(baseAmazonUrl, pathes, featureMap || {}));
    const emailContentItems = createEmailContentItems(data, extraInfoFn, validatorFn);

    saveData(type, data);

    if (type === 'disks') {
      if (emailContentItems.length) {
        sendEmail({
          to: 'sj0x55@gmail.com',
          subject: `Price dropped (${type}) !!!`,
          html: emailContentItems.join('<br /><br />'),
        });

        console.log(`Sent "${type}" notification with ${emailContentItems.length} item/s.\n`);
      } else {
        console.log(`No "${type}" notification has been sent.\n`);
      }
    }
  };

  fetchDataByType('smartphones', [`/hz/wishlist/genericItemsPage/P2ZKOL4X451E?${urlQuery}`], {
    size: /Size Name[\\n\s]+:[\\n\s]+(.+)/i,
    color: /Colour[\\n\s]+:[\\n\s]+(.+)/i,
  });

  fetchDataByType(
    'disks',
    [
      `/hz/wishlist/ls/2KE9LBKCL3WBX?${urlQuery}`,
      `/hz/wishlist/ls/202GH96LTIUGX?${urlQuery}`,
      `/hz/wishlist/ls/3UTIRVZK6MNXU?${urlQuery}`,
      `/hz/wishlist/ls/B3BSCZ23IGZU?${urlQuery}`,
      `/hz/wishlist/ls/2CRH7UTBN1RW9?${urlQuery}`,
      `/hz/wishlist/ls/282MWNCIB5SRV?${urlQuery}`,
    ],
    {
      capacity: [/Capacity[\\n\s]+:[\\n\s]+(\d+)/i, Number],
    },
    (item) => {
      const { price, features } = item;
      const extraInfo = [];

      if (features && features.capacity) {
        extraInfo.push(`<strong>Price per TB:</strong> £${parseFloat((price / features.capacity).toFixed(2))}`);
      }

      return extraInfo;
    },
    (item) => {
      const { price, features } = item;

      if (features && features.capacity) {
        return price / features.capacity < 17;
      } else {
        return false;
      }
    },
  );

  fetchDataByType('something', [
    `/hz/wishlist/ls/2HMPV7AU1IQUH?${urlQuery}`,
    `/hz/wishlist/ls/34AZXQ9DIXXUM?${urlQuery}`,
    `/hz/wishlist/ls/1ZTW8TPP194QS?${urlQuery}`,
  ]);
})();
