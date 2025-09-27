import { Plus, Send } from 'lucide-react'
import { useState } from 'react'

export default function Notifications() {
  const [recipients, setRecipients] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert('Announcement sent successfully!')
    setRecipients('')
    setSubject('')
    setMessage('')
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Notifications & Announcements
          </h1>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <button className="btn btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            New Announcement
          </button>
        </div>
      </div>

      {/* Notification Composer */}
      <div className="max-w-2xl">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Send Announcement</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="recipients" className="form-label">
                Recipients
              </label>
              <select
                id="recipients"
                className="form-input"
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
                required
              >
                <option value="">Select recipients</option>
                <option value="all-students">All Students</option>
                <option value="all-instructors">All Instructors</option>
                <option value="all-users">All Users</option>
                <option value="specific-course">Specific Course</option>
              </select>
            </div>

            <div>
              <label htmlFor="subject" className="form-label">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="form-input"
                placeholder="Announcement subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                className="form-input"
                placeholder="Write your announcement..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-end">
              <button type="submit" className="btn btn-primary">
                <Send className="w-4 h-4 mr-2" />
                Send Announcement
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
