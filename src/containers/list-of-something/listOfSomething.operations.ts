export const sortData = (data: SomethingItem[]): SomethingItem[] => {
  data.sort((aItem: SomethingItem, bItem: SomethingItem) => {
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
