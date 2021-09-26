import { info, error } from 'modules/logger';
import { ProductConditions } from './constants';

export const timeoutOfPromise = <T>(ms: number, promise: Promise<T>): Promise<T> => {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject(new Error('timeout'));
    }, ms);
    promise.then(resolve, reject);
  });
};

export const fetchData = async (method: string, type: string): Promise<Product[]> => {
  const fetchDataFromUrl = async (url: string) => {
    const timeout = method === 'GET' ? 1000 : 10000;
    const time = new Date().getTime();

    info(`Fetching data from: ${url}`);
    return (await timeoutOfPromise<Response>(timeout, fetch(`${url}?t=${time}`, { method }))).json();
  };

  try {
    return await fetchDataFromUrl(`${process.env.REACT_APP_LOCAL_SERVER_URL}/data/${type}`);
  } catch (err) {
    error(`${err}`);
    return await fetchDataFromUrl(`${process.env.REACT_APP_REMOTE_SERVER_URL}/data/${type}`);
  }
};

export const fetchDataPayloadCreator = async ([method, type]: ['GET' | 'PUT', string]) => {
  try {
    return await fetchData(method || 'GET', type);
  } catch (err) {
    error(`${err}`);
    return [];
  }
};

export const filterData = (options: AppFiltersState) => (item: Product) => {
  const isItemNew = item.condition === ProductConditions.New;
  const isItemUsed = item.condition === ProductConditions.Used;

  if ((isItemNew && !options.isNew) || (isItemUsed && !options.isUsed)) {
    return false;
  }

  return true;
};

// export const decoratePriceDrop = (isPriceDropped: boolean, prevPrice: number | null, price: number | null): string => {
//   if (price) {
//     return `${prevPrice && isPriceDropped ? `${appendCurrency(prevPrice)} > ` : ''}${appendCurrency(price)}`;
//   } else {
//     return '-';
//   }
// };

// export const isPriceDropped = (item: Product): boolean => {
//   if (item.prevPrice && calcPriceChangePercentages(item.prevPrice, item.price) >= 5) {
//     return item.prevPrice > item.price;
//   } else {
//     return false;
//   }
// };
