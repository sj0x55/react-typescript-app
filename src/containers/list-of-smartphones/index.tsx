import { Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'components/Link';
import {
  decorateFlagDrop,
  isPriceDropped,
  appendCurrency,
  calcPriceChangePercentages,
} from 'containers/main-content/mainContent.operations';
import { ContentLayoutCell, ContentLayoutGrid } from 'components/layouts/content';
import { prepareData, sortData } from './listOfSmartphones.operations';
import { Text } from 'components/Text';
import { DateFormat } from 'components/DateFormat';
import { Image } from 'components/Image';
import { Space } from 'components/Space';

const Wrapper = styled(ContentLayoutGrid)`
  grid-template-columns: 40px 120px 200px 200px 150px 1fr 120px;
`;

export const ListOfSmartphones = ({ data }: ListOfSmartphonesProps) => {
  const amazonBaseUrl = 'https://www.amazon.co.uk';
  const colsNum = 7;

  return (
    <Wrapper>
      <ContentLayoutCell columns={colsNum} align="center">
        -
      </ContentLayoutCell>
      <ContentLayoutCell columns={colsNum} align="center">
        Image
      </ContentLayoutCell>
      <ContentLayoutCell columns={colsNum} align="center">
        Price
      </ContentLayoutCell>
      <ContentLayoutCell columns={colsNum} align="center">
        Size
      </ContentLayoutCell>
      <ContentLayoutCell columns={colsNum} align="center">
        Condition
      </ContentLayoutCell>
      <ContentLayoutCell columns={colsNum}>Name</ContentLayoutCell>
      <ContentLayoutCell align="right" columns={colsNum}>
        Last update
      </ContentLayoutCell>

      {sortData(prepareData(data)).map((item: SmartphoneItem, index: number) => (
        <Fragment key={`row${index}`}>
          <ContentLayoutCell columns={colsNum} align="center" bold={isPriceDropped(item)}>
            {decorateFlagDrop(item)}
          </ContentLayoutCell>
          <ContentLayoutCell columns={colsNum} align="center">
            <Image src={`${item.image}`} alt={item.title} width="60" height="60" />
          </ContentLayoutCell>
          <ContentLayoutCell columns={colsNum} align="center" bold={isPriceDropped(item)}>
            {appendCurrency(item.price)}

            {isPriceDropped(item) ? (
              <Text block={true} size="m">
                <Space /> (-{calcPriceChangePercentages(item.prevPrice, item.price, 0)}%)
              </Text>
            ) : (
              ''
            )}
          </ContentLayoutCell>
          <ContentLayoutCell columns={colsNum} align="center" bold={isPriceDropped(item)}>
            {item.features.size}
          </ContentLayoutCell>
          <ContentLayoutCell columns={colsNum} align="center" bold={isPriceDropped(item)}>
            {item.condition}
          </ContentLayoutCell>
          <ContentLayoutCell columns={colsNum} bold={isPriceDropped(item)}>
            <Link href={`${amazonBaseUrl}${item.href}`} target="_blank">
              {item.title}
            </Link>
          </ContentLayoutCell>
          <ContentLayoutCell align="right" columns={colsNum} bold={isPriceDropped(item)}>
            <Text size="m">
              <DateFormat date={item.timestampChanged} />
            </Text>
          </ContentLayoutCell>
        </Fragment>
      ))}
    </Wrapper>
  );
};
