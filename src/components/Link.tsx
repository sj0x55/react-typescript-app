import styled from 'styled-components';
import { ThemeInterface } from 'styles/theme';

export interface LinkProps {
  size?: string;
  theme?: ThemeInterface;
}

export const Link = styled.a`
  font-size: ${(props: LinkProps) => (props.theme && props.size ? props.theme.fontSize[props.size] : null)};
`;
