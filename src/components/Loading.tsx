import styled from 'styled-components';

export const Wrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: bold;
  padding: 10px;
  text-align: center;
`;

export const Loading = () => {
  return <Wrapper>Loading data...</Wrapper>;
};
