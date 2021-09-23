import { PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';
import { ThemeInterface } from 'styles/theme';

export interface TextProps {
  bold?: boolean;
  size?: string;
  block?: boolean;
  theme?: ThemeInterface;
}

const baseCss = css`
  font-weight: ${(props: PropsWithChildren<TextProps>) => (props.bold ? 'bold' : null)};
  font-size: ${(props: PropsWithChildren<TextProps>) =>
    props.theme && props.size ? props.theme.fontSize[props.size] : null};
`;

export const BlockText = styled.div`
  ${baseCss}
`;

export const InlineText = styled.span`
  ${baseCss}
`;

export const Text = (props: PropsWithChildren<TextProps>) => {
  if (props.block) {
    return <BlockText {...props}>{props.children}</BlockText>;
  } else {
    return <InlineText {...props}>{props.children}</InlineText>;
  }
};
