import type { Meta, StoryObj } from "@storybook/react"
import { Bold } from "lucide-react"

import { Toggle } from "./toggle"

const meta: Meta<typeof Toggle> = {
  title: "UI/Toggle",
  component: Toggle,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
    disabled: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof Toggle>

export const Default: Story = {
  render: (args) => (
    <Toggle {...args} aria-label="Toggle bold">
      <Bold />
    </Toggle>
  ),
}

export const Outline: Story = {
  render: (args) => (
    <Toggle {...args} variant="outline" aria-label="Toggle bold">
      <Bold />
    </Toggle>
  ),
}

export const Pressed: Story = {
  render: (args) => (
    <Toggle {...args} defaultPressed aria-label="Toggle bold">
      <Bold />
    </Toggle>
  ),
}

export const WithText: Story = {
  render: (args) => (
    <Toggle {...args} aria-label="Toggle bold">
      <Bold /> Bold
    </Toggle>
  ),
}

export const Disabled: Story = {
  render: (args) => (
    <Toggle {...args} disabled aria-label="Toggle bold">
      <Bold />
    </Toggle>
  ),
}
