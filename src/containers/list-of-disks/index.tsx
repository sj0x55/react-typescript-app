import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';
import { Link } from 'components/Link';
import {
  decorateFlagDrop,
  calcPriceChangePercentages,
  appendCurrency,
  isPriceDropped,
} from 'containers/main-content/mainContent.operations';
import { ContentLayoutCell, ContentLayoutGrid } from 'components/layouts/content';
import { selectCapacityMin, selectCapacityMax } from './listOfDisks.selectors';
import { prepareData, sortData, filterData } from './listOfDisks.operations';
import { Text } from 'components/Text';
import { DateFormat } from 'components/DateFormat';
import { Image } from 'components/Image';

const Wrapper = styled(ContentLayoutGrid)`
  grid-template-columns: 40px 120px 200px 200px 150px 150px 1fr 120px;
`;

export const ListOfDisks = ({ data }: ListOfDisksProps) => {
  const amazonBaseUrl = 'https://www.amazon.co.uk';
  const colsNum = 8;
  const capacityMin = useSelector(selectCapacityMin);
  const capacityMax = useSelector(selectCapacityMax);

  return (
    <Wrapper>
      <ContentLayoutCell columns={colsNum} align="center">
        -
      </ContentLayoutCell>
      <ContentLayoutCell columns={colsNum} align="center">
        Image
      </ContentLayoutCell>
      <ContentLayoutCell columns={colsNum} align="center">
        Price per TB
      </ContentLayoutCell>
      <ContentLayoutCell columns={colsNum} align="center">
        Price
      </ContentLayoutCell>
      <ContentLayoutCell columns={colsNum} align="center">
        Capacity
      </ContentLayoutCell>
      <ContentLayoutCell columns={colsNum} align="center">
        Condition
      </ContentLayoutCell>
      <ContentLayoutCell columns={colsNum}>Name</ContentLayoutCell>
      <ContentLayoutCell align="right" columns={colsNum}>
        Last update
      </ContentLayoutCell>

      {sortData(prepareData(data))
        .filter(filterData({ capacityMin, capacityMax }))
        .map((item: DiskItem, index: number) => (
          <Fragment key={`row${index}`}>
            <ContentLayoutCell columns={colsNum} align="center" bold={isPriceDropped(item)}>
              {decorateFlagDrop(item)}
            </ContentLayoutCell>
            <ContentLayoutCell columns={colsNum} align="center">
              <Image src={`${item.image}`} alt={item.title} width="60" height="60" />
            </ContentLayoutCell>
            <ContentLayoutCell columns={colsNum} align="center" flexDirection="column">
              <Text>
                <Text bold={isPriceDropped(item)}>{appendCurrency(item.pricePerTB)}</Text>
                {isPriceDropped(item) ? (
                  <Text size="m"> (-{calcPriceChangePercentages(item.prevPrice, item.price, 0)}%)</Text>
                ) : (
                  ''
                )}
              </Text>

              {isPriceDropped(item) ? <Text size="m">(was: {appendCurrency(item.prevPricePerTB)})</Text> : ''}
            </ContentLayoutCell>
            <ContentLayoutCell columns={colsNum} align="center" flexDirection="column">
              <Text bold={isPriceDropped(item)}>{appendCurrency(item.price)}</Text>
              {isPriceDropped(item) ? <Text size="m">(was: {appendCurrency(item.prevPrice)})</Text> : ''}
            </ContentLayoutCell>
            <ContentLayoutCell columns={colsNum} align="center" bold={isPriceDropped(item)}>
              {item.features.capacity ? `${item.features.capacity}TB` : '-'}
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
