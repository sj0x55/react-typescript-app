import styled from 'styled-components';
import { Cell } from '../../grid';

export default styled(Cell)`
  border: 2px solid ${({ theme }) => theme.colors.darkGrey};
  padding: 5px;

  &:first-child {
    margin-right: 20px;
  }
`;
