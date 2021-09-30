import { Story } from '@storybook/react';
import { Checkbox } from './';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
};

const Template: Story = () => <Checkbox />;

export const Default = Template.bind({});
