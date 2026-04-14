import type { Meta, StoryObj } from "@storybook/react"

import { Input } from "./input"
import { Label } from "./label"

const meta: Meta<typeof Label> = {
  title: "UI/Label",
  component: Label,
}

export default meta
type Story = StoryObj<typeof Label>

export const Default: Story = {
  args: {
    children: "Label text",
  },
}

export const WithInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="name">Name</Label>
      <Input id="name" placeholder="Your name" />
    </div>
  ),
}

export const Required: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="required-field">
        Email <span className="text-destructive">*</span>
      </Label>
      <Input id="required-field" type="email" placeholder="email@example.com" />
    </div>
  ),
}
