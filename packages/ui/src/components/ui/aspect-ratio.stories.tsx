import type { Meta, StoryObj } from "@storybook/react";
import { AspectRatio } from "./aspect-ratio";

const meta: Meta<typeof AspectRatio> = {
  title: "Layout/AspectRatio",
  component: AspectRatio,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    ratio: {
      control: { type: "number", min: 0.1, max: 4, step: 0.1 },
      description: "Width-to-height ratio",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AspectRatio>;

const RatioBox = ({ label }: { label: string }) => (
  <div className="flex h-full w-full items-center justify-center rounded-md bg-muted">
    <span className="text-sm font-medium text-muted-foreground">{label}</span>
  </div>
);

export const Ratio16x9: Story = {
  name: "16:9",
  render: () => (
    <div className="w-[450px]">
      <AspectRatio ratio={16 / 9}>
        <RatioBox label="16:9" />
      </AspectRatio>
    </div>
  ),
};

export const Ratio4x3: Story = {
  name: "4:3",
  render: () => (
    <div className="w-[400px]">
      <AspectRatio ratio={4 / 3}>
        <RatioBox label="4:3" />
      </AspectRatio>
    </div>
  ),
};

export const Ratio1x1: Story = {
  name: "1:1",
  render: () => (
    <div className="w-[300px]">
      <AspectRatio ratio={1}>
        <RatioBox label="1:1" />
      </AspectRatio>
    </div>
  ),
};
