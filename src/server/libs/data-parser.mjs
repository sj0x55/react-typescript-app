import { priceToNumber, arrayToObject } from '../utils.mjs';

export const productFactory =
  (data, features) =>
  (variantData = {}) => {
    const { condition, price, extraData } = variantData;

    return {
      ...data,
      ...extraData,
      condition,
      features,
      price: priceToNumber(price),
    };
  };

export const productsFactory =
  (...args) =>
  (variants = []) => {
    return variants.map((variantData) => productFactory(...args)(variantData));
  };

export const parseFeatureMap = (featureMap, text) => {
  const productFeatures = {};

  if (text && typeof text === 'string') {
    Object.entries(featureMap).forEach(([key, rexExp]) => {
      const parseValue = (...args) => {
        const matched = text.match(args[0]);
        const matcherFn = args[1];

        return matched && (matcherFn ? matcherFn(matched) : matched[1].trim());
      };

      let matchedValue;

      if (Array.isArray(rexExp)) {
        matchedValue = parseValue(...rexExp);
      } else {
        matchedValue = parseValue(rexExp);
      }

      if (!productFeatures[key] && matchedValue) {
        productFeatures[key] = matchedValue;
      }
    });
  }

  return productFeatures;
};

export const mergeData = (currPoductData, newProductData) => {
  const currPoductDataObj = arrayToObject(['condition', 'href'], currPoductData);
  const newProductDataObj = arrayToObject(['condition', 'href'], newProductData);

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
