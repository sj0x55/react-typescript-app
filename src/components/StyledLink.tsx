import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const activeClassName = 'active-link';

export const StyledLink = styled(NavLink).attrs({ activeClassName })`
  position: relative;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
  color: inherit;
  margin: 0 10px;
  padding: 5px 10px;

  &:hover {
    text-decoration: underline;
  }

  &.${activeClassName} {
    &::after {
      opacity: 1;
    }
  }

  &::after {
    transition: opacity 0.4s ease-in-out;
    transform: translateY(-50%);
    background-color: ${({ theme }) => theme.colors.grey};
    position: absolute;
    content: '';
    opacity: 0;
    width: 10px;
    height: 20px;
    top: 50%;
    left: -5px;
  }
`;
