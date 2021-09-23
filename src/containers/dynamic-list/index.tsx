import styled from 'styled-components';
import { get } from 'lodash';
import { calcPricePerTB } from 'containers/list-of-disks/listOfDisks.operations';
import { ContentLayoutGrid, ContentLayoutCell } from 'components/layouts/content';
import { Text } from 'components/Text';
import { Link } from 'components/Link';
import { Image } from 'components/Image';
import { DateFormat } from 'components/DateFormat';

// This is only POC.
// Work in progress.
export const DynamicList = ({ data }: DynamicListItemProps) => {
  const amazonBaseUrl = 'https://www.amazon.co.uk'; // Move to enums

  // Pass as a "prop"
  const items: Item[] = [
    {
      name: 'Image',
      align: 'center',
      type: 'image',
      dataProperty: 'image',
      colSize: '100px',
    },
    {
      name: 'Price per TB',
      type: 'price',
      align: 'center',
      dataFactory: (item) => {
        const { features, price } = item;
        const { capacity } = features || {};

        return calcPricePerTB(price, Number(capacity || 0));
      },
      colSize: '200px',
    },
    {
      name: 'Price',
      type: 'price',
      align: 'center',
      dataProperty: 'price',
      colSize: '200px',
    },
    {
      name: 'Condition',
      type: 'text',
      align: 'center',
      dataProperty: 'condition',
      colSize: '140px',
    },
    {
      name: 'Capacity',
      type: 'text',
      align: 'center',
      dataProperty: 'features.capacity',
      colSize: '140px',
    },
    {
      name: 'Name',
      type: 'link',
      dataProperty: 'title',
      colSize: '1fr',
    },
    {
      name: 'Last update',
      type: 'date',
      align: 'right',
      dataProperty: 'timestampChanged',
      colSize: '140px',
      textSize: 'm',
    },
  ];

  const colsNum = items.length;
  const Wrapper = styled(ContentLayoutGrid)`
    grid-template-columns: ${items.map((item) => item.colSize).join(' ')};
  `;

  return (
    <Wrapper>
      {items.map((item, index) => (
        <ContentLayoutCell key={`head${index}`} columns={items.length} align={item.align}>
          {item.name}
        </ContentLayoutCell>
      ))}

      {data.map((dataItem, index1) =>
        items.map((item, index2) => (
          <ContentLayoutCell key={`cell${index1}-${index2}`} columns={colsNum} align={item.align}>
            {item.type === 'link' ? (
              <Link href={`${amazonBaseUrl}${dataItem.href}`} target="_blank">
                {item.dataProperty ? get(dataItem, item.dataProperty) : item.dataFactory && item.dataFactory(dataItem)}
              </Link>
            ) : item.type === 'image' ? (
              <Image src={`${dataItem.image}`} width="60" height="60" />
            ) : item.type === 'price' ? (
              item.dataProperty && typeof get(dataItem, item.dataProperty) === 'number' ? (
                item.dataProperty ? (
                  get(dataItem, item.dataProperty)
                ) : (
                  ''
                )
              ) : (
                item.dataFactory && item.dataFactory(dataItem)
              )
            ) : item.dataProperty && item.type === 'date' ? (
              <Text size={item.textSize}>
                <DateFormat date={Number(get(dataItem, item.dataProperty) || 0)} />
              </Text>
            ) : (
              item.dataProperty && get(dataItem, item.dataProperty)
            )}
          </ContentLayoutCell>
        )),
      )}
    </Wrapper>
  );
};
