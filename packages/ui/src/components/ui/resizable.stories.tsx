import type { Meta, StoryObj } from "@storybook/react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "./resizable";

// ResizablePanelGroup wraps react-resizable-panels Group which accepts
// direction prop, but TypeScript doesn't infer it through the wrapper.
const Group = ResizablePanelGroup as React.FC<
  React.ComponentProps<typeof ResizablePanelGroup> & {
    direction: "horizontal" | "vertical"
  }
>;

const meta: Meta = {
  title: "Layout/Resizable",
  component: ResizablePanelGroup,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj;

const PanelContent = ({ label }: { label: string }) => (
  <div className="flex h-full items-center justify-center text-sm font-medium">
    {label}
  </div>
);

export const Horizontal: Story = {
  name: "Horizontal Panels",
  render: () => (
    <div className="h-[300px] w-[500px] rounded-md border">
      <Group direction="horizontal">
        <ResizablePanel defaultSize={50}>
          <PanelContent label="Left" />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <PanelContent label="Right" />
        </ResizablePanel>
      </Group>
    </div>
  ),
};

export const Vertical: Story = {
  name: "Vertical Panels",
  render: () => (
    <div className="h-[400px] w-[300px] rounded-md border">
      <Group direction="vertical">
        <ResizablePanel defaultSize={40}>
          <PanelContent label="Top" />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={60}>
          <PanelContent label="Bottom" />
        </ResizablePanel>
      </Group>
    </div>
  ),
};

export const Nested: Story = {
  name: "Nested Panels",
  render: () => (
    <div className="h-[400px] w-[600px] rounded-md border">
      <Group direction="horizontal">
        <ResizablePanel defaultSize={30}>
          <PanelContent label="Sidebar" />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={70}>
          <Group direction="vertical">
            <ResizablePanel defaultSize={60}>
              <PanelContent label="Main Content" />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={40}>
              <PanelContent label="Terminal" />
            </ResizablePanel>
          </Group>
        </ResizablePanel>
      </Group>
    </div>
  ),
};
