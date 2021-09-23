export const calcPricePerTB = (price?: number | null, capacity?: number): number | null => {
  if (capacity && price) {
    return parseFloat((price / capacity).toFixed(2));
  } else {
    return null;
  }
};

export const prepareData = (data: DiskItem[]) => {
  return data.map((item) => {
    const { features, price, prevPrice } = item;
    const { capacity } = features || {};

    return {
      ...item,
      features: { ...features },
      pricePerTB: calcPricePerTB(price, capacity),
      prevPricePerTB: calcPricePerTB(prevPrice, capacity),
    };
  });
};

export const sortData = (data: DiskItem[]) => {
  data.sort((aItem: DiskItem, bItem: DiskItem) => {
    const { pricePerTB: aPricePerTB = null } = aItem;
    const { pricePerTB: bPricePerTB = null } = bItem;

    if (!aPricePerTB) {
      return 1;
    } else if (!bPricePerTB) {
      return -1;
    } else {
      return aPricePerTB < bPricePerTB ? -1 : 1;
    }
  });

  return data;
};

export const filterData = (options: Partial<ListOfDisksState>) => (item: DiskItem) => {
  const { capacity } = item.features;
  const { capacityMin, capacityMax } = options;

  if (capacity) {
    return !((capacityMin && capacity < capacityMin) || (capacityMax && capacity > capacityMax));
  }

  return true;
};
