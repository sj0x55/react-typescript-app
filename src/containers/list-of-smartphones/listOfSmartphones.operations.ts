export const prepareData = (data: SmartphoneItem[]): SmartphoneItem[] => {
  return data.map((item) => {
    const { features } = item;

    return {
      ...item,
      features: { ...features },
    };
  });
};

export const sortData = (data: SmartphoneItem[]): SmartphoneItem[] => {
  data.sort((aItem: SmartphoneItem, bItem: SmartphoneItem) => {
    const { price: aPrice = null } = aItem;
    const { price: bPrice = null } = bItem;

    if (!aPrice) {
      return 1;
    } else if (!bPrice) {
      return -1;
    } else {
      return aPrice < bPrice ? -1 : 1;
    }
  });

  return data;
};
