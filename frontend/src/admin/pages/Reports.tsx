import { Download, FileText, FileSpreadsheet } from 'lucide-react'

const reportTypes = [
  {
    title: 'Student Progress Report',
    description: 'Detailed progress analysis for all students',
    type: 'PDF',
    icon: FileText,
  },
  {
    title: 'Course Performance Report',
    description: 'Course completion and engagement metrics',
    type: 'CSV',
    icon: FileSpreadsheet,
  },
  {
    title: 'Quiz Analytics Report',
    description: 'Comprehensive quiz performance analysis',
    type: 'PDF',
    icon: FileText,
  },
]

export default function Reports() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Reports & Insights
          </h1>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <button className="btn btn-primary">
            <Download className="w-4 h-4 mr-2" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Report Types Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reportTypes.map((report, index) => (
          <div key={index} className="card p-6 text-center">
            <div className="mx-auto w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <report.icon className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.title}</h3>
            <p className="text-gray-600 mb-4">{report.description}</p>
            <button className="btn btn-secondary w-full">
              Generate {report.type}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
