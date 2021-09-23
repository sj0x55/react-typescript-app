type SmartphoneItemFeatures = {
  color?: string;
};

type SmartphoneItem = MainContentItem & {
  features: SmartphoneItemFeatures;
};

type ListOfSmartphonesProps = {
  data: SmartphoneItem[];
};

interface ListOfSmartphonesState {}
