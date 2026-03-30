import { createContext, useState } from "react"

export const ToastContext = createContext()

export function ToastProvider({ children }) {
  const [message, setMessage] = useState("")

  function showToast(text) {
    setMessage(text)

    setTimeout(() => {
      setMessage("")
    }, 2000)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {message && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 
  backdrop-blur-md bg-white/70 dark:bg-zinc-800/70 
  text-gray-800 dark:text-gray-100 
  px-4 py-2 rounded-xl shadow-md 
  border border-gray-200/50 dark:border-zinc-700/50">
  {message}
</div>
      )}
    </ToastContext.Provider>
  )
}