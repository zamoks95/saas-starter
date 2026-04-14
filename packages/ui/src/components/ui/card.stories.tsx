import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "./card";

const meta: Meta<typeof Card> = {
  title: "Layout/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent>
        <p>Basic card with content only.</p>
      </CardContent>
    </Card>
  ),
};

export const WithHeaderContentFooter: Story = {
  name: "Header / Content / Footer",
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the main content area of the card.</p>
      </CardContent>
      <CardFooter>
        <button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
          Action
        </button>
      </CardFooter>
    </Card>
  ),
};

export const NotificationCard: Story = {
  name: "Notification Card",
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
        <CardAction>
          <button className="text-sm text-muted-foreground hover:underline">
            Mark all read
          </button>
        </CardAction>
      </CardHeader>
      <CardContent className="grid gap-4">
        {[
          {
            title: "New sign-in detected",
            description: "A new device signed in to your account.",
          },
          {
            title: "Payment received",
            description: "Your invoice #1234 has been paid.",
          },
          {
            title: "Subscription renewed",
            description: "Your Pro plan renews on May 1.",
          },
        ].map((item) => (
          <div key={item.title} className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
            <div className="grid gap-0.5">
              <p className="text-sm font-medium">{item.title}</p>
              <p className="text-xs text-muted-foreground">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <button className="w-full rounded-md border px-4 py-2 text-sm">
          View all notifications
        </button>
      </CardFooter>
    </Card>
  ),
};
