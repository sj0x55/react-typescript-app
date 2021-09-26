type DiskItem = Product & {
  pricePerTB: number | null;
  prevPricePerTB: number | null;
  features: {
    capacity?: number;
  };
};

type ListOfDisksProps = {
  data: DiskItem[];
};
