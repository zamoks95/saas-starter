import type { Meta, StoryObj } from "@storybook/react";
import { ScrollArea, ScrollBar } from "./scroll-area";

const meta: Meta<typeof ScrollArea> = {
  title: "Layout/ScrollArea",
  component: ScrollArea,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

const items = Array.from({ length: 30 }, (_, i) => `Item ${i + 1}`);

export const VerticalScroll: Story = {
  name: "Vertical Scroll",
  render: () => (
    <ScrollArea className="h-[200px] w-[250px] rounded-md border p-4">
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-md border px-3 py-2 text-sm"
          >
            {item}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const HorizontalScroll: Story = {
  name: "Horizontal Scroll",
  render: () => (
    <ScrollArea className="w-[400px] rounded-md border p-4">
      <div className="flex gap-3 pb-4">
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className="flex h-24 w-36 shrink-0 items-center justify-center rounded-md bg-muted text-sm font-medium"
          >
            Panel {i + 1}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};

export const BothDirections: Story = {
  name: "Both Directions",
  render: () => (
    <ScrollArea className="h-[200px] w-[300px] rounded-md border p-4">
      <div className="w-[600px] space-y-2">
        {items.map((item) => (
          <div
            key={item}
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            {item} — This content is wide enough to require horizontal scrolling
            as well.
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};
