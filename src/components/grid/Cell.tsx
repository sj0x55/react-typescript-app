import { PropsWithChildren } from 'react';
import styled from 'styled-components';

export type CellProps = {
  align?: string;
  bold?: boolean;
};

export default styled.div`
  text-align: ${(props: PropsWithChildren<CellProps>) => props.align};
  font-weight: ${(props: PropsWithChildren<CellProps>) => (props.bold ? 'bold' : null)};
`;
