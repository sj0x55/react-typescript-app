export const calcPricePerTB = (price?: number | null, capacity?: number): number | null => {
  if (capacity && price) {
    return parseFloat((price / capacity).toFixed(2));
  } else {
    return null;
  }
};

export const prepareData = (data: DiskItem[]): DiskItem[] => {
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

export const filterData = (filters: ProductFilters, items: DiskItem[]) => {
  return items.filter((item) => {
    const { capacity } = item.features;
    const { ['capacity.min']: capacityMin, ['capacity.max']: capacityMax } = filters || {};

    if (capacity) {
      return !((capacityMin && capacity < capacityMin) || (capacityMax && capacity > capacityMax));
    }
  });
};
