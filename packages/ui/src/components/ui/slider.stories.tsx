import type { Meta, StoryObj } from "@storybook/react"

import { Slider } from "./slider"

const meta: Meta<typeof Slider> = {
  title: "UI/Slider",
  component: Slider,
  argTypes: {
    disabled: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof Slider>

export const Default: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
    className: "w-[300px]",
  },
}

export const WithCustomRange: Story = {
  args: {
    defaultValue: [25],
    min: 0,
    max: 50,
    step: 5,
    className: "w-[300px]",
  },
}

export const RangeSlider: Story = {
  args: {
    defaultValue: [20, 80],
    max: 100,
    step: 1,
    className: "w-[300px]",
  },
}

export const Disabled: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    disabled: true,
    className: "w-[300px]",
  },
}
