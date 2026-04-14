import type { Meta, StoryObj } from "@storybook/react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"

const meta: Meta<typeof Tabs> = {
  title: "UI/Tabs",
  component: Tabs,
}

export default meta
type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="rounded-md border p-4">
          <p className="text-sm text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="rounded-md border p-4">
          <p className="text-sm text-muted-foreground">
            Update your password and security settings.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="notifications">
        <div className="rounded-md border p-4">
          <p className="text-sm text-muted-foreground">
            Configure how you receive notifications.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
}
