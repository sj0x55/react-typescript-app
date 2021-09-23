import { PropsWithChildren } from 'react';
import { Label } from 'components/Label';
import styled from 'styled-components';

type PaneProps = {
  title?: string;
  align?: string;
  border?: boolean;
  padding?: boolean;
  background?: boolean;
};

export const PaneWrapper = styled.div`
  margin-bottom: 10px;
  text-align: ${(props: PaneProps) => props.align};
  ${(props: PaneProps) => props.border && (({ theme: { colors } }) => `border: 1px solid ${colors.darkGrey};`)}
  ${(props: PaneProps) => props.background && (({ theme: { colors } }) => `background: ${colors.lightGrey};`)}
  ${(props: PaneProps) => props.padding && `padding: 5px;`}

  ${Label}:first-child {
    font-weight: bold;
    display: block;
    margin-bottom: 10px;
    text-decoration: underline;
  }
`;

export const Pane = ({
  title,
  border = true,
  padding = true,
  background = true,
  align,
  children,
}: PropsWithChildren<PaneProps>) => {
  return (
    <PaneWrapper {...{ align, border, padding, background }}>
      {title && <Label>{title}:</Label>}
      {children}
    </PaneWrapper>
  );
};
