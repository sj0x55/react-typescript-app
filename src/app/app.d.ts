type KeyValObj = {
  [key: string]: unknown;
};

type ProductJsonSchema = {
  condition: string;
  title: string;
  image: string | null;
  href: string;
  price: number;
  prevPrice: number | null;
  isPriceChanged: boolean;
  timestampChanged: number;
  features: {
    [key: string]: string | number;
  };
};

type Product = ProductJsonSchema & {
  condition: 'new' | 'used';
  isPriceDropped: boolean;
} & {
  [key: string]: Product[keyof Product];
};

type ProductTypes = 'disks' | 'smartphones' | 'other' | 'something';

type ProductFilters = {
  [key: string]: string | number | boolean | null;
};

type AppFiltersState = {
  isNew: boolean;
  isUsed: boolean;
  [key: ProductTypes]: ProductFilters;
};

type AppState = {
  status: 'idle' | 'loading' | 'failed';
  data: Product[];
  filters: AppFiltersState;
};
