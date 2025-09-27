import { UserPlus, Shield, User, Users } from 'lucide-react'

const userRoles = [
  {
    title: 'Super Admin',
    description: 'Full system access',
    count: 1,
    icon: Shield,
    color: 'bg-red-100 text-red-600',
  },
  {
    title: 'Admin',
    description: 'Course and user management',
    count: 3,
    icon: User,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    title: 'Instructor',
    description: 'Course content management',
    count: 8,
    icon: User,
    color: 'bg-green-100 text-green-600',
  },
  {
    title: 'Student',
    description: 'Course access and progress',
    count: 156,
    icon: Users,
    color: 'bg-purple-100 text-purple-600',
  },
]

export default function UserManagement() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            User Management
          </h1>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <button className="btn btn-primary">
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </button>
        </div>
      </div>

      {/* User Roles Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {userRoles.map((role, index) => (
          <div key={index} className="card p-6 text-center">
            <div className={`mx-auto w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${role.color}`}>
              <role.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{role.title}</h3>
            <p className="text-gray-600 mb-4">{role.description}</p>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
              {role.count} user{role.count !== 1 ? 's' : ''}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
