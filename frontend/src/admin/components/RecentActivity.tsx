import { Activity } from '../types'
import { UserPlus, CheckCircle, Trophy, Book, ClipboardList } from 'lucide-react'

interface RecentActivityProps {
  activities: Activity[]
}

const iconMap = {
  UserPlus,
  CheckCircle,
  Trophy,
  Book,
  ClipboardList,
}

export default function RecentActivity({ activities }: RecentActivityProps) {
  const getTimeAgo = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000)
    
    if (diffInSeconds < 60) {
      return 'Just now'
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60)
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600)
      return `${hours} hour${hours > 1 ? 's' : ''} ago`
    } else {
      const days = Math.floor(diffInSeconds / 86400)
      return `${days} day${days > 1 ? 's' : ''} ago`
    }
  }

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="flow-root">
        <ul role="list" className="-mb-8">
          {activities.map((activity, activityIdx) => {
            const Icon = iconMap[activity.icon as keyof typeof iconMap]
            return (
              <li key={activityIdx}>
                <div className="relative pb-8">
                  {activityIdx !== activities.length - 1 ? (
                    <span
                      className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex items-start space-x-3">
                    <div className="relative">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full ring-8 ring-white ${activity.color}`}>
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <p className="text-sm text-gray-900">{activity.message}</p>
                        <p className="mt-0.5 text-sm text-gray-500">
                          {getTimeAgo(activity.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
