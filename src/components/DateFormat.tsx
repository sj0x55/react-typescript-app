import styled from 'styled-components';
import { formatDistance } from 'date-fns';

export interface DateProps {
  date: string | number;
}

export const Wrapper = styled.span``;
export const DateFormat = ({ date }: DateProps) => {
  const dateToFormat = date ? new Date(date) : new Date();

  return <Wrapper>{formatDistance(new Date(), dateToFormat)}</Wrapper>;
};
