import React from "react"

interface PageWrapperProps {
  topContent: React.ReactNode
  mainContent: React.ReactNode
}

export function PageWrapper({ topContent, mainContent }: PageWrapperProps) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      
      {/* Top Block */}
      <div className="mx-auto w-full max-w-3xl shrink-0 px-4 pb-4">
        {topContent}
      </div>
      
      {/* Bottom Block: Now with desktop scrollbar hiding classes */}
      <div className="mx-auto w-full max-w-3xl flex-1 overflow-y-auto rounded-xl border p-2 sm:[scrollbar-width:none] sm:[-ms-overflow-style:none] sm:[&::-webkit-scrollbar]:hidden">
        {mainContent}
      </div>
      
    </div>
  )
}