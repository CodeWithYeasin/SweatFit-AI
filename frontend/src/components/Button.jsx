export function Button({ children, size, ...props }) {
  const sizeClasses = size === "icon" ? "p-2" : "px-4 py-2"

  return (
    <button
      className={`bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors ${sizeClasses}`}
      {...props}
    >
      {children}
    </button>
  )
}

