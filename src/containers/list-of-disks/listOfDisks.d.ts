type DiskItemFeatures = {
  capacity?: number;
};

type DiskItem = MainContentItem & {
  pricePerTB: number | null;
  prevPricePerTB: number | null;
  features: DiskItemFeatures;
};

type ListOfDisksProps = {
  data: DiskItem[];
};

interface ListOfDisksState {
  capacityMin: number | null;
  capacityMax: number | null;
}
