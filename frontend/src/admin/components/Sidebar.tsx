import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Link, useLocation,useNavigate } from 'react-router-dom'
import { X, GraduationCap, BarChart3, Users, BookOpen, TrendingUp, ClipboardCheck, FileText, Settings, Bell, LogOut } from 'lucide-react'
import { clsx } from 'clsx'
import { useAuth } from '@/shared/context/AuthContext'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: BarChart3 },
  { name: 'Students', href: '/admin/students', icon: Users },
  { name: 'Courses', href: '/admin/courses', icon: BookOpen },
  { name: 'Progress', href: '/admin/progress', icon: TrendingUp },
  { name: 'Reports', href: '/admin/reports', icon: FileText },
  { name: 'User Management', href: '/admin/users', icon: Settings },
]

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)
  const location = useLocation()
  const navigate = useNavigate() 
  const { logout, user } = useAuth()
  const userName = user?.name || 'Admin User'
  const initials = getInitials(userName)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const MobileSidebarContent = () => (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
      <div className="flex h-16 shrink-0 items-center mt-6">
        <GraduationCap className="h-8 w-8 text-primary-600" />
        <span className="ml-2 text-xl font-bold text-gray-900">Rohtak Guided Learning Tracker</span>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={clsx(
                        isActive
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-700 hover:text-primary-700 hover:bg-primary-50',
                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                      )}
                      onClick={() => setOpen(false)}
                    >
                      <item.icon
                        className={clsx(
                          isActive ? 'text-primary-700' : 'text-gray-400 group-hover:text-primary-700',
                          'h-6 w-6 shrink-0'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </li>
          <li className="mt-auto space-y-2">
            <div className="flex items-center gap-x-4 px-2 py-3 text-sm font-semibold leading-6 text-gray-900">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-white text-sm font-medium">
                {initials}
              </div>
              <div className="flex flex-col">
                <span className="sr-only">Your profile</span>
                <span aria-hidden="true">testadmin</span>
                <span className="text-xs text-gray-400">Administrator</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700 hover:text-red-700 hover:bg-red-50 transition-colors duration-200"
            >
              <LogOut className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-red-700" />
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )

  return (
    <>
      {/* Mobile sidebar */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button type="button" className="-m-2.5 p-2.5" onClick={() => setOpen(false)}>
                      <span className="sr-only">Close sidebar</span>
                      <X className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <MobileSidebarContent />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop Collapsible Sidebar */}
      <div
        className={clsx(
          "hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col bg-white border-r border-gray-200 shadow-lg transition-all duration-300 ease-in-out",
          sidebarExpanded ? "lg:w-72" : "lg:w-16"
        )}
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
      >
        <div className="flex grow flex-col gap-y-5 overflow-hidden">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center px-4">
            <div className={clsx(
              "flex items-center transition-all duration-300",
              sidebarExpanded ? "space-x-3" : "justify-center"
            )}>
              <GraduationCap className="h-8 w-8 text-primary-600 flex-shrink-0" />
              {sidebarExpanded && (
                <span className="text-xl font-bold text-gray-900 transition-opacity duration-300">
                  Rohtak Guided Learning Tracker
                </span>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col px-2">
            <ul role="list" className="flex flex-1 flex-col gap-y-1">
              <li>
                <ul role="list" className="space-y-1">
                  {navigation.map((item) => {
                    const isActive = location.pathname === item.href
                    return (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className={clsx(
                            "group flex items-center gap-x-3 rounded-lg text-sm leading-6 font-semibold transition-all duration-200",
                            sidebarExpanded ? "p-3" : "p-3 justify-center",
                            isActive
                              ? 'bg-primary-600 text-white shadow-md'
                              : 'text-gray-700 hover:text-primary-700 hover:bg-primary-50'
                          )}
                          title={!sidebarExpanded ? item.name : undefined}
                        >
                          <item.icon
                            className={clsx(
                              "h-6 w-6 shrink-0 transition-colors duration-200",
                              isActive 
                                ? 'text-white' 
                                : 'text-gray-400 group-hover:text-primary-700'
                            )}
                            aria-hidden="true"
                          />
                          {sidebarExpanded && (
                            <span className="transition-opacity duration-300">
                              {item.name}
                            </span>
                          )}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </li>

              {/* User Profile */}
              <li className="mt-auto mb-2">
                <div className={clsx(
                  "flex items-center transition-all duration-300",
                  sidebarExpanded ? "gap-x-4 px-3 py-3" : "justify-center px-3 py-3"
                )}>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-white text-sm font-medium flex-shrink-0">
                    {initials}
                  </div>
                  {sidebarExpanded && (
                    <div className="flex flex-col transition-opacity duration-300">
                      <span className="text-sm font-semibold text-gray-900">testadmin</span>
                      <span className="text-xs text-gray-400">Administrator</span>
                    </div>
                  )}
                </div>
              </li>

              {/* Logout Button */}
              <li className="mb-4">
                <button
                  onClick={handleLogout}
                  className={clsx(
                    "group flex items-center gap-x-3 rounded-lg text-sm leading-6 font-semibold transition-all duration-200 w-full text-gray-700 hover:text-red-700 hover:bg-red-50",
                    sidebarExpanded ? "p-3" : "p-3 justify-center"
                  )}
                  title={!sidebarExpanded ? "Logout" : undefined}
                >
                  <LogOut
                    className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-red-700 transition-colors duration-200"
                    aria-hidden="true"
                  />
                  {sidebarExpanded && (
                    <span className="transition-opacity duration-300">
                      Logout
                    </span>
                  )}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}

function getInitials(name: string) {
  const names = name.trim().split(' ')
  if (names.length === 1) return names[0].charAt(0).toUpperCase()
  return (names[0].charAt(0) + names[1].charAt(0)).toUpperCase()
}