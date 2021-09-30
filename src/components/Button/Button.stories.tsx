import { Story } from '@storybook/react';
import type { ButtonProps } from './Button';
import { Button } from './';

export default {
  title: 'Components/Button',
  component: Button,
};

const Template: Story<ButtonProps> = (args) => <Button {...args}>Click me!</Button>;

export const Default = Template.bind({});
export const Stretched = Template.bind({});

Stretched.args = {
  stretch: true,
};
