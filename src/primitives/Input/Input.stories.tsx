import type { Meta, StoryObj } from '@storybook/react'
import { Input, Textarea, Field } from './Input'

const SEARCH_ICON = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 10l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)
const EYE_ICON = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M1 7s2.5-4.5 6-4.5S13 7 13 7s-2.5 4.5-6 4.5S1 7 1 7z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle cx="7" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)
const AT_ICON = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M10 7c0 1.7 1 2.5 2 2.5V4.5A5.5 5.5 0 102 7a5.5 5.5 0 005.5 5.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

const wrap = (Story: any) => (
  <div data-theme="dark" style={{ padding: 32, background: 'var(--bg)', maxWidth: 400 }}>
    <Story />
  </div>
)

// ─── Input ──────────────────────────────────────────────────────────────────

const inputMeta = {
  title: 'Primitives/Input',
  component: Input,
  args: { type: 'text', placeholder: 'Enter value…', disabled: false },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search'],
      description: 'HTML input type — affects keyboard on mobile and browser autofill.',
      table: { defaultValue: { summary: 'text' } },
    },
    placeholder: {
      control: 'text',
      description: 'Hint text shown when the field is empty.',
    },
    value: {
      control: 'text',
      description: 'Controlled value (use defaultValue for uncontrolled).',
    },
    disabled: {
      control: 'boolean',
      description: 'Prevents interaction and applies muted styling.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  decorators: [wrap],
} satisfies Meta<typeof Input>
export default inputMeta
type Story = StoryObj<typeof inputMeta>

export const Playground: Story = { name: '· Playground' }

export const Default: Story = { args: { placeholder: 'Enter text…' } }
export const Email: Story = { args: { type: 'email', placeholder: 'you@company.com' } }
export const Password: Story = { args: { type: 'password', placeholder: 'Enter password' } }
export const Disabled: Story = { args: { placeholder: 'Not editable', disabled: true } }

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Input placeholder="Default state" />
      <Input defaultValue="Filled state" />
      <Input placeholder="Disabled state" disabled />
    </div>
  ),
}

export const WithFormField: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label
          htmlFor="demo-email"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--ink-dim)',
          }}
        >
          Work email
        </label>
        <Input id="demo-email" type="email" placeholder="you@company.com" />
        <span style={{ fontSize: 11, color: 'var(--ink-faint)', fontFamily: 'var(--font-mono)' }}>
          We'll never share your email.
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label
          htmlFor="demo-password"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--ink-dim)',
          }}
        >
          Password
        </label>
        <Input id="demo-password" type="password" placeholder="8+ characters" />
      </div>
    </div>
  ),
}

// ─── Field ───────────────────────────────────────────────────────────────────

export const FieldPlayground: Story = {
  name: 'Field · Playground',
  args: {
    label: 'Email address',
    placeholder: 'you@company.com',
    hint: "We'll never share your email.",
  } as any,
  argTypes: {
    label: { control: 'text', description: 'External label shown above the input.' },
    labelInside: {
      control: 'text',
      description: 'Label rendered inside the input block (replaces external label).',
    },
    hint: { control: 'text', description: 'Helper text shown below the input.' },
    error: {
      control: 'text',
      description: 'Error message — overrides hint, shown in danger color.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the field.',
      table: { defaultValue: { summary: 'false' } },
    },
    placeholder: { control: 'text', description: 'Input placeholder text.' },
  } as any,
  render: (args: any) => <Field {...args} />,
}

export const FieldWithLabel: Story = {
  name: 'Field · Label above',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Field label="Work email" type="email" placeholder="you@company.com" />
      <Field label="Full name" type="text" placeholder="Jane Smith" />
      <Field
        label="Password"
        type="password"
        placeholder="8+ characters"
        hint="Use a mix of letters and numbers."
      />
    </div>
  ),
}

export const FieldWithAdornmentLeft: Story = {
  name: 'Field · Left adornment',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Field adornmentLeft={SEARCH_ICON} placeholder="Search missions…" />
      <Field adornmentLeft={AT_ICON} type="email" placeholder="your handle" label="Email" />
      <Field
        adornmentLeft={<span style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>$</span>}
        placeholder="0.00"
        label="Amount"
        type="number"
      />
    </div>
  ),
}

export const FieldWithAdornmentRight: Story = {
  name: 'Field · Right adornment',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Field
        adornmentRight={EYE_ICON}
        type="password"
        placeholder="Enter password"
        label="Password"
      />
      <Field adornmentRight={SEARCH_ICON} placeholder="Search…" />
    </div>
  ),
}

export const FieldWithBothAdornments: Story = {
  name: 'Field · Both adornments',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Field
        label="Amount"
        adornmentLeft={<span style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>$</span>}
        adornmentRight={
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-dim)' }}>
            USD
          </span>
        }
        type="number"
        placeholder="0.00"
        hint="Minimum $5.00"
      />
      <Field
        label="Search"
        adornmentLeft={SEARCH_ICON}
        adornmentRight={
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.08em',
              color: 'var(--ink-dim)',
            }}
          >
            ⌘K
          </span>
        }
        placeholder="Find anything…"
      />
    </div>
  ),
}

export const FieldLabelInside: Story = {
  name: 'Field · Label inside',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Field labelInside="Work email" type="email" placeholder="you@company.com" />
      <Field labelInside="Full name" type="text" placeholder="Jane Smith" />
      <Field labelInside="Amount (USD)" type="number" placeholder="0.00" />
      <Field labelInside="Search" adornmentLeft={SEARCH_ICON} placeholder="Find anything…" />
    </div>
  ),
}

export const FieldWithHint: Story = {
  name: 'Field · With hint',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Field
        label="Username"
        placeholder="@handle"
        hint="Letters, numbers, and underscores only."
      />
      <Field
        label="Invite code"
        placeholder="XXXX-XXXX"
        hint="Check your welcome email for the code."
      />
    </div>
  ),
}

export const FieldWithError: Story = {
  name: 'Field · With error',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Field
        label="Work email"
        type="email"
        defaultValue="not-an-email"
        error="Enter a valid email address."
      />
      <Field
        label="Password"
        type="password"
        defaultValue="abc"
        error="Password must be at least 8 characters."
      />
    </div>
  ),
}

export const AllFieldVariants: Story = {
  name: 'Field · All variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Field label="Label above" placeholder="External label" />
      <Field adornmentLeft={SEARCH_ICON} placeholder="Left adornment" />
      <Field adornmentRight={EYE_ICON} type="password" placeholder="Right adornment" />
      <Field labelInside="Label inside" placeholder="Inset label" />
      <Field label="With hint" placeholder="Helper text" hint="This is a hint." />
      <Field label="With error" placeholder="Error state" error="Something went wrong." />
    </div>
  ),
}

// ─── Textarea ─────────────────────────────────────────────────────────────────

export const TextareaPlayground: Story = {
  name: 'Textarea · Playground',
  args: { placeholder: 'Type your answer…', rows: 4, disabled: false } as any,
  argTypes: {
    placeholder: { control: 'text', description: 'Hint text shown when empty.' },
    rows: {
      control: { type: 'range', min: 2, max: 10, step: 1 },
      description: 'Initial visible row count.',
    },
    disabled: { control: 'boolean', description: 'Prevents interaction.' },
  } as any,
  render: (args: any) => (
    <Textarea placeholder={args.placeholder} rows={args.rows} disabled={args.disabled} />
  ),
}

export const TextareaDefault: Story = {
  name: 'Textarea · Default',
  render: () => <Textarea placeholder="What's your biggest growth challenge?" />,
}

export const TextareaDisabled: Story = {
  name: 'Textarea · Disabled',
  render: () => (
    <Textarea placeholder="Read-only" defaultValue="This field is not editable." disabled />
  ),
}
