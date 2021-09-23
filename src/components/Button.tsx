import { ReactNode, PropsWithChildren } from 'react';
import styled from 'styled-components';

type ButtonProps = {
  stretch: boolean;
  children?: ReactNode;
};

export const Button = styled.button`
  background: ${({ theme }) => theme.colors.darkGrey};
  border: 1px solid ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.xl};
  padding: 5px 20px;

  ${(props: PropsWithChildren<ButtonProps>) => props.stretch && `width: 100%;`}

  &:hover:not(:disabled) {
    cursor: pointer;
    text-decoration: underline;
  }

  &:disabled {
    opacity: 0.3;
  }
`;
