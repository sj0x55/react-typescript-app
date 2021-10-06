import styled from 'styled-components';
import { Grid } from '../../grid';

export default styled(Grid).attrs({ 'data-testid': 'root-container' })`
  grid-template-columns: 300px auto;
`;
