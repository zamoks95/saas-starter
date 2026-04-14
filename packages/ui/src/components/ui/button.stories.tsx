import type { Meta, StoryObj } from "@storybook/react"
import { ChevronRight, Loader2, Mail } from "lucide-react"

import { Button } from "./button"

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["default", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"],
    },
    disabled: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: "Button",
  },
}

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Delete",
  },
}

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
}

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
}

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost",
  },
}

export const Link: Story = {
  args: {
    variant: "link",
    children: "Link",
  },
}

export const ExtraSmall: Story = {
  args: {
    size: "xs",
    children: "Extra Small",
  },
}

export const Small: Story = {
  args: {
    size: "sm",
    children: "Small",
  },
}

export const Large: Story = {
  args: {
    size: "lg",
    children: "Large",
  },
}

export const Icon: Story = {
  args: {
    size: "icon",
    variant: "outline",
  },
  render: (args) => (
    <Button {...args}>
      <ChevronRight />
    </Button>
  ),
}

export const WithIcon: Story = {
  render: (args) => (
    <Button {...args}>
      <Mail /> Login with Email
    </Button>
  ),
}

export const Loading: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <Button {...args}>
      <Loader2 className="animate-spin" /> Please wait
    </Button>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
  },
}
