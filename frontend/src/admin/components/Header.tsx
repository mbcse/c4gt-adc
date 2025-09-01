import { Menu } from 'lucide-react'
import { useAuth } from '@/shared/context/AuthContext'

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { user } = useAuth()
  const userName = user?.name || 'Admin User'
  const initials = getInitials(userName)

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        onClick={onMenuClick}
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 items-center lg:gap-x-6">
        <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>

        <div className="flex-grow" />

        <div
          className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-medium"
          aria-label="User avatar"
          title={userName}
        >
          {initials}
        </div>

        <span className="hidden lg:flex lg:items-center ml-4">
          <span className="text-sm font-semibold leading-6 text-gray-900">{userName}</span>
        </span>
      </div>
    </div>
  )
}

// Helper to get initials
function getInitials(name: string) {
  const names = name.trim().split(' ')
  if (names.length === 1) return names[0].charAt(0).toUpperCase()
  return (names[0].charAt(0) + names[1].charAt(0)).toUpperCase()
}
