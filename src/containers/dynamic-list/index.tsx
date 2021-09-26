import styled from 'styled-components';
import { PropsWithChildren } from 'react';
import { get, join, isString } from 'lodash';
import { ContentLayoutGrid, ContentLayoutCell } from 'components/layouts/content';
import { Text } from 'components/Text';
import { Link } from 'components/Link';
import { Image } from 'components/Image';
import { DateFormat } from 'components/DateFormat';

const Wrapper = styled(ContentLayoutGrid)`
  grid-template-columns: ${(props: PropsWithChildren<{ sizes: string[] }>) => join(props.sizes, ' ')};
`;

const renderCellByType = (conf: DynamicListConfig, item: DynamicListItem) => {
  const value = (conf.dataPropertyName && get(item, conf.dataPropertyName)) || null;
  const { dataPrefix, dataSuffix, type, textSize } = conf;

  switch (type) {
    case 'link':
      return (
        <Link href={item.href} target="_blank">
          {value}
        </Link>
      );
    case 'image':
      return isString(value) ? <Image src={value} width="60" height="60" /> : <Text size="m">[no image]</Text>;
    case 'date':
      return (
        <Text size={textSize}>
          <DateFormat date={Number(value || 0)} />
        </Text>
      );
    default:
      return <Text>{join([dataPrefix, value, dataSuffix], '').trim() || '-'}</Text>;
  }
};

const prepareConfig = (config: DynamicListConfig[]) => {
  return [
    {
      name: '-',
      type: 'text',
      colSize: '40px',
      align: 'center',
    },
    ...config,
    {
      name: 'Last update',
      type: 'date',
      colSize: '120px',
      textSize: 'm',
      align: 'right',
      dataPropertyName: 'timestampChanged',
    },
  ];
};

export const DynamicList = ({ config, data }: DynamicListConfigProps) => {
  const colsLength = prepareConfig(config).length;

  return (
    <Wrapper sizes={prepareConfig(config).map((item) => item.colSize)}>
      {prepareConfig(config).map((conf, i) => (
        <ContentLayoutCell key={`head${i}`} columns={colsLength} align={conf.align}>
          {conf.name}
        </ContentLayoutCell>
      ))}

      {data.map((item, i) =>
        prepareConfig(config).map((conf, j) => (
          <ContentLayoutCell key={`cell${i}-${j + 1}`} columns={colsLength} align={conf.align}>
            {renderCellByType(conf, item)}
          </ContentLayoutCell>
        )),
      )}
    </Wrapper>
  );
};
