import type { Meta, StoryObj } from "@storybook/react"
import { Home, Inbox, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "./sidebar"

const meta: Meta<typeof Sidebar> = {
  title: "UI/Sidebar",
  component: Sidebar,
  decorators: [
    (Story) => (
      <SidebarProvider>
        <div className="flex min-h-[400px] w-full">
          <Story />
          <main className="flex-1 p-4">
            <p className="text-sm text-muted-foreground">Main content area</p>
          </main>
        </div>
      </SidebarProvider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof Sidebar>

const navItems = [
  { title: "Home", icon: Home },
  { title: "Inbox", icon: Inbox },
  { title: "Search", icon: Search },
  { title: "Settings", icon: Settings },
]

export const Default: Story = {
  render: () => (
    <Sidebar>
      <SidebarHeader>
        <span className="px-2 text-sm font-semibold">Acme Inc</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <span className="px-2 text-xs text-muted-foreground">v1.0.0</span>
      </SidebarFooter>
    </Sidebar>
  ),
}
