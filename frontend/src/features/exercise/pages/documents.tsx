// src/app/pages/DocumentsPage.tsx
export default function DocumentsPage() {
  return (
    <>
      {/* 
        This content drops right into the <Outlet /> in AppLayout 
        The padding and sizing is already handled by the layout!
      */}
      <div className="mx-auto h-24 w-full max-w-3xl rounded-xl bg-muted/50 flex items-center justify-center border">
        Documents Toolbar Placeholder
      </div>
      <div className="mx-auto h-full w-full max-w-3xl rounded-xl bg-muted/50 flex items-center justify-center border">
        Documents List Placeholder
      </div>
    </>
  )
}