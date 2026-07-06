import { Button } from "@/components/ui/button";
import { getAllExercises } from "../api/exerciseApi";

// src/app/pages/DocumentsPage.tsx
export default function DocumentsPage() {
  const handleClick = async () => {
    const data = await getAllExercises();

    console.log(data);       // See response in browser console
    alert(JSON.stringify(data)); // Just to verify it works
  };
  return (
    <>
      {/* 
        This content drops right into the <Outlet /> in AppLayout 
        The padding and sizing is already handled by the layout!
      */}
      <div className="mx-auto h-24 w-full max-w-3xl rounded-xl bg-muted/50 flex items-center justify-center border">
        Documents Toolbar Placeholder
        <Button variant="outline" className="ml-4" onClick={handleClick}>
          click me
        </Button>
      </div>
      <div className="mx-auto h-full w-full max-w-3xl rounded-xl bg-muted/50 flex items-center justify-center border">
        Documents List Placeholder
      </div>
    </>
  )
}