## 1. Install shadcn components via CLI

- [ ] 1.1 Install foundational components: button, input, label, textarea, separator, badge, skeleton
- [ ] 1.2 Install layout components: card, aspect-ratio, scroll-area, resizable, collapsible
- [ ] 1.3 Install overlay components: dialog, sheet, drawer, popover, hover-card, tooltip, alert-dialog
- [ ] 1.4 Install navigation components: navigation-menu, menubar, breadcrumb, pagination, tabs, sidebar
- [ ] 1.5 Install form components: checkbox, radio-group, select, switch, slider, toggle, toggle-group, form, input-otp
- [ ] 1.6 Install data display components: table, avatar, progress, chart, calendar, date-picker
- [ ] 1.7 Install feedback components: alert, toast, sonner
- [ ] 1.8 Install command components: command, combobox, context-menu, dropdown-menu
- [ ] 1.9 Install remaining components: accordion, carousel, data-table

## 2. Verify installation and exports

- [ ] 2.1 Verify all component files exist in `src/components/ui/`
- [ ] 2.2 Verify all dependencies were added to `package.json`
- [ ] 2.3 Ensure components are accessible via package exports (test imports resolve)

## 3. Create Storybook stories - Foundational components

- [ ] 3.1 Create `button.stories.tsx` (variants: default, destructive, outline, secondary, ghost, link; sizes: sm, default, lg, icon; states: disabled, loading, with icon)
- [ ] 3.2 Create `input.stories.tsx` (types: text, email, password, file; states: disabled, with label, with error)
- [ ] 3.3 Create `label.stories.tsx` (default, with input, required)
- [ ] 3.4 Create `textarea.stories.tsx` (default, disabled, with label, with character count)
- [ ] 3.5 Create `separator.stories.tsx` (horizontal, vertical)
- [ ] 3.6 Create `badge.stories.tsx` (variants: default, secondary, destructive, outline)
- [ ] 3.7 Create `skeleton.stories.tsx` (card skeleton, list skeleton, text skeleton)

## 4. Create Storybook stories - Layout components

- [ ] 4.1 Create `card.stories.tsx` (default, with header/content/footer, with form, notification card)
- [ ] 4.2 Create `aspect-ratio.stories.tsx` (16:9, 4:3, 1:1 with image)
- [ ] 4.3 Create `scroll-area.stories.tsx` (vertical, horizontal, both directions)
- [ ] 4.4 Create `resizable.stories.tsx` (horizontal panels, vertical panels, nested)
- [ ] 4.5 Create `collapsible.stories.tsx` (default, open by default, with multiple items)

## 5. Create Storybook stories - Overlay components

- [ ] 5.1 Create `dialog.stories.tsx` (default, with form, scrollable content, custom close)
- [ ] 5.2 Create `sheet.stories.tsx` (sides: top, right, bottom, left; with form content)
- [ ] 5.3 Create `drawer.stories.tsx` (default, with snap points, with form)
- [ ] 5.4 Create `popover.stories.tsx` (default, with form, positioning)
- [ ] 5.5 Create `hover-card.stories.tsx` (default, user profile card)
- [ ] 5.6 Create `tooltip.stories.tsx` (default, with delay, positioning)
- [ ] 5.7 Create `alert-dialog.stories.tsx` (default, destructive action confirmation)

## 6. Create Storybook stories - Navigation components

- [ ] 6.1 Create `navigation-menu.stories.tsx` (default, with submenus)
- [ ] 6.2 Create `menubar.stories.tsx` (default, with keyboard shortcuts)
- [ ] 6.3 Create `breadcrumb.stories.tsx` (default, with dropdown, with ellipsis)
- [ ] 6.4 Create `pagination.stories.tsx` (default, with many pages, compact)
- [ ] 6.5 Create `tabs.stories.tsx` (default, with content, vertical)
- [ ] 6.6 Create `sidebar.stories.tsx` (default, collapsible, with navigation items)

## 7. Create Storybook stories - Form components

- [ ] 7.1 Create `checkbox.stories.tsx` (default, checked, disabled, with label, indeterminate)
- [ ] 7.2 Create `radio-group.stories.tsx` (default, horizontal, disabled option)
- [ ] 7.3 Create `select.stories.tsx` (default, with groups, scrollable, disabled)
- [ ] 7.4 Create `switch.stories.tsx` (default, checked, disabled, with label)
- [ ] 7.5 Create `slider.stories.tsx` (default, range, steps, disabled)
- [ ] 7.6 Create `toggle.stories.tsx` (default, outline, pressed, disabled, with icon)
- [ ] 7.7 Create `toggle-group.stories.tsx` (single, multiple, outline variant)
- [ ] 7.8 Create `form.stories.tsx` (complete form example with validation)
- [ ] 7.9 Create `input-otp.stories.tsx` (default, with separator, different lengths)

## 8. Create Storybook stories - Data display components

- [ ] 8.1 Create `table.stories.tsx` (default, sortable headers, with actions, empty state)
- [ ] 8.2 Create `avatar.stories.tsx` (with image, fallback initials, sizes, group)
- [ ] 8.3 Create `progress.stories.tsx` (default, animated, different values)
- [ ] 8.4 Create `chart.stories.tsx` (bar, line, area chart examples)
- [ ] 8.5 Create `calendar.stories.tsx` (single date, date range, disabled dates)
- [ ] 8.6 Create `date-picker.stories.tsx` (single, range, with presets)

## 9. Create Storybook stories - Feedback & Command components

- [ ] 9.1 Create `alert.stories.tsx` (default, destructive, with icon, with description)
- [ ] 9.2 Create `toast.stories.tsx` (default, with title, with action, destructive)
- [ ] 9.3 Create `sonner.stories.tsx` (success, error, info, with action, promise)
- [ ] 9.4 Create `command.stories.tsx` (default, with groups, dialog mode)
- [ ] 9.5 Create `combobox.stories.tsx` (default, searchable, multi-select)
- [ ] 9.6 Create `context-menu.stories.tsx` (default, with sub-menu, with checkboxes)
- [ ] 9.7 Create `dropdown-menu.stories.tsx` (default, with checkboxes, with radio items, nested)

## 10. Create Storybook stories - Remaining components

- [ ] 10.1 Create `accordion.stories.tsx` (single, multiple, with icons)
- [ ] 10.2 Create `carousel.stories.tsx` (default, autoplay, vertical, with thumbnails)
- [ ] 10.3 Create `data-table.stories.tsx` (default, with sorting, filtering, pagination)

## 11. Final verification

- [ ] 11.1 Run `bun run storybook` and verify all stories render without errors
- [ ] 11.2 Run `bun run typecheck` in `packages/ui` to ensure no type errors
- [ ] 11.3 Run `bun run lint` to ensure no lint issues
