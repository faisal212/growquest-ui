import type { ReactNode } from 'react'
import { headers } from 'next/headers'
import { fetchBrand } from '../src/config/fetchBrand'
import { BrandProvider } from '../src/config/BrandProvider'
import { BrandStyles } from '../src/config/BrandStyles'
import { DemoShell } from '../src/shell/DemoShell'
import { PreviewMount } from '../src/preview/PreviewMount'
import '../styles.css'

export const metadata = {
  title: 'GrowQuest',
  description: 'Gamification platform — multi-tenant demo',
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const h = await headers()
  const tenantId = h.get('x-tenant-id') ?? 'default'
  const config = await fetchBrand(tenantId)

  return (
    <html lang="en" data-theme={config.mode}>
      <head>
        <BrandStyles config={config} />
      </head>
      <body>
        <BrandProvider value={config}>
          <DemoShell>{children}</DemoShell>
          <PreviewMount tenantId={tenantId} />
        </BrandProvider>
      </body>
    </html>
  )
}
