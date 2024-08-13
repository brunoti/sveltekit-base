import { type VariantProps, tv } from 'tailwind-variants'

import Root from './alert.svelte'
import Description from './alert-description.svelte'
import Title from './alert-title.svelte'

export const alertVariants = tv({
  base: '[&>iconify-icon]:text-foreground relative w-full rounded-lg border p-4 [&:has(iconify-icon)]:pl-11 [&>iconify-icon+div]:translate-y-[-3px] [&>iconify-icon]:absolute [&>iconify-icon]:left-4 [&>iconify-icon]:top-4',

  variants: {
    variant: {
      default: 'bg-background text-foreground',
      destructive:
        'border-destructive/50 text-destructive text-destructive dark:border-destructive [&>svg]:text-destructive'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

export type Variant = VariantProps<typeof alertVariants>['variant']
export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export {
  Root,
  Description,
  Title,
  //
  Root as Alert,
  Description as AlertDescription,
  Title as AlertTitle
}
