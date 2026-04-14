import type { Meta, StoryObj } from "@storybook/react"
import { toast } from "sonner"

import { Toaster } from "./sonner"
import { Button } from "./button"

const meta: Meta<typeof Toaster> = {
  title: "UI/Sonner",
  component: Toaster,
  decorators: [
    (Story) => (
      <div>
        <Story />
        <Toaster />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Toaster>

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => toast("Default toast notification")}>
        Default
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.success("Action completed successfully")}
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.error("Something went wrong")}
      >
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.info("Here is some useful info")}
      >
        Info
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.warning("Please proceed with caution")}
      >
        Warning
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast("Event created", {
            description: "Monday, January 3rd at 6:00pm",
            action: { label: "Undo", onClick: () => {} },
          })
        }
      >
        With Action
      </Button>
    </div>
  ),
}
