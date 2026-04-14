import type { Meta, StoryObj } from "@storybook/react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./collapsible";

const meta: Meta<typeof Collapsible> = {
  title: "Layout/Collapsible",
  component: Collapsible,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    open: {
      control: "boolean",
      description: "Controlled open state",
    },
    defaultOpen: {
      control: "boolean",
      description: "Whether the collapsible is open by default",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  name: "Default (Closed)",
  render: () => (
    <Collapsible className="w-[300px] space-y-2">
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted">
        Toggle content
        <span className="text-muted-foreground">+</span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="rounded-md border px-4 py-3 text-sm">
          This content is hidden by default and revealed when the trigger is
          clicked.
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const OpenByDefault: Story = {
  name: "Open by Default",
  render: () => (
    <Collapsible defaultOpen className="w-[300px] space-y-2">
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted">
        Toggle content
        <span className="text-muted-foreground">-</span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="rounded-md border px-4 py-3 text-sm">
          This content is visible by default because the collapsible starts
          open.
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const MultipleItems: Story = {
  name: "Multiple Items",
  render: () => (
    <Collapsible defaultOpen className="w-[300px] space-y-2">
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted">
        Show all items
        <span className="text-muted-foreground">3 items</span>
      </CollapsibleTrigger>
      <div className="rounded-md border px-4 py-2 text-sm">
        Item 1 — Always visible
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-2 text-sm">
          Item 2 — Hidden until expanded
        </div>
        <div className="rounded-md border px-4 py-2 text-sm">
          Item 3 — Hidden until expanded
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};
