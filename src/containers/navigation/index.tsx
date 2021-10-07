import styled from 'styled-components';
import { StyledLink } from 'components/StyledLink';

export const Wrapper = styled.nav`
  background: ${({ theme }) => theme.colors.darkGrey};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  padding: 5px 0;
  margin: 10px 0;
`;

export const Navigation = () => {
  return (
    <>
      <Wrapper>
        <StyledLink to="/disks" data-test="disks">
          Disks
        </StyledLink>
        <StyledLink to="/smartphones" data-test="smartphones">
          Smartphones
        </StyledLink>
        <StyledLink to="/other" data-test="other">
          Other
        </StyledLink>
      </Wrapper>
    </>
  );
};
