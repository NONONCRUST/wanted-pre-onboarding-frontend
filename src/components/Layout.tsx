import React, { PropsWithChildren } from 'react'

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="flex min-h-screen items-center justify-center">
      {children}
    </main>
  )
}

export default Layout
