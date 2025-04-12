
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    // Set initial state based on window size if available
    if (typeof window !== 'undefined') {
      return window.innerWidth < MOBILE_BREAKPOINT
    }
    // Default to false for SSR
    return false
  })

  React.useEffect(() => {
    // Use matchMedia for better performance
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Set initial state
    setIsMobile(mediaQuery.matches)
    
    // Define handler function
    const handleResize = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches)
    }
    
    // Modern approach using addEventListener
    mediaQuery.addEventListener('change', handleResize)
    
    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleResize)
    }
  }, [])

  return isMobile
}
