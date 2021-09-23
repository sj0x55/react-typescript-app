type DynamicListItem = MainContentItem;

type DynamicListItemProps = {
  data: DynamicListItem[];
};

type DataFactory<T> = (item: DynamicListItem) => T;

type Item = {
  name: string;
  type: 'link' | 'image' | 'price' | 'date' | 'text';
  textSize?: string;
  align?: 'center' | 'right' | 'left';
  dataProperty?: string;
  dataFactory?: DataFactory<T>;
  colSize: string;
} & {
  [key: string]: Item[keyof Item];
};

interface DynamicListState {}
