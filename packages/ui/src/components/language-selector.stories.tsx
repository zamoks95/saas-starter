import type { Meta, StoryObj } from "@storybook/react"

import { LanguageSelector } from "./language-selector"

const defaultLanguages = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
]

const meta: Meta<typeof LanguageSelector> = {
  title: "Components/LanguageSelector",
  component: LanguageSelector,
  argTypes: {
    currentLanguage: {
      control: "select",
      options: ["en", "es"],
    },
    languages: {
      control: "object",
    },
  },
  args: {
    languages: defaultLanguages,
  },
}

export default meta
type Story = StoryObj<typeof LanguageSelector>

export const Default: Story = {
  args: {
    currentLanguage: "en",
  },
}

export const SpanishSelected: Story = {
  args: {
    currentLanguage: "es",
  },
}

export const ManyLanguages: Story = {
  args: {
    currentLanguage: "en",
    languages: [
      { code: "en", label: "English" },
      { code: "es", label: "Español" },
      { code: "fr", label: "Français" },
      { code: "de", label: "Deutsch" },
    ],
  },
}
