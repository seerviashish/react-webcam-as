import { Meta, StoryFn } from '@storybook/react';
import { WebcamExample } from '../examples/Webcam.example';

export default {
  title: 'WebcamExample',
  component: WebcamExample,
  argTypes: {},
} as Meta<typeof WebcamExample>;

const Template: StoryFn<typeof WebcamExample> = () => <WebcamExample />;

export const Primary = Template.bind({});

Primary.args = {};
