import type { Meta, StoryObj } from "@storybook/react"

import { Progress } from "./progress"

const meta: Meta<typeof Progress> = {
  title: "UI/Progress",
  component: Progress,
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100 } },
  },
}

export default meta
type Story = StoryObj<typeof Progress>

export const Default: Story = {
  args: {
    value: 33,
  },
}

export const Half: Story = {
  args: {
    value: 50,
  },
}

export const Complete: Story = {
  args: {
    value: 100,
  },
}

export const Empty: Story = {
  args: {
    value: 0,
  },
}
