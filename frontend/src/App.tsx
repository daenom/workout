import { Button } from "./components/ui/button"
import { ThemeProvider } from "./components/theme-provider"
import { ModeToggle } from "./components/mode-toggle"
import { useState } from "react"

function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background text-foreground">
        <div className="text-3xl font-bold">
          Hello
        </div>
        <div>
          <Button variant="outline" onClick={() => setCount(count + 1)}>
            Clicks: {count}
          </Button>
        </div>
        <div>
          <ModeToggle />
        </div>
      </div>

    </ThemeProvider>
  )

}

export default App
