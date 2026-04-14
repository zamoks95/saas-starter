import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"

import { Calendar } from "./calendar"

const meta: Meta<typeof Calendar> = {
  title: "UI/Calendar",
  component: Calendar,
}

export default meta
type Story = StoryObj<typeof Calendar>

export const Default: Story = {
  render: function Render() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    )
  },
}

export const WithRange: Story = {
  render: function Render() {
    const [range, setRange] = React.useState<{
      from: Date | undefined
      to?: Date | undefined
    }>({
      from: new Date(),
      to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })

    return (
      <Calendar
        mode="range"
        selected={range}
        onSelect={(value) => {
          if (value) setRange(value)
        }}
        numberOfMonths={2}
        className="rounded-md border"
      />
    )
  },
}
