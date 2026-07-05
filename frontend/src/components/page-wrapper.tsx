import React from "react"

interface PageWrapperProps {
  topContent: React.ReactNode
  mainContent: React.ReactNode
}

export function PageWrapper({ topContent, mainContent }: PageWrapperProps) {
  return (
    <>
      {/* Top Block: For titles, tabs, or quick actions */}
      <div className="mx-auto flex h-24 w-full max-w-6xl items-center rounded-xl px-4">
        {topContent}
      </div>
      
      {/* Bottom Block: For the primary data/content */}
      <div className="mx-auto flex h-full w-full max-w-6xl flex-col rounded-xl border p-4">
        {mainContent}
      </div>
    </>
  )
}