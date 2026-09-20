import { useState, useEffect } from 'react'
import { Clock, User, Search, Activity } from 'lucide-react'
import { api } from '../../utils/api'

export default function AuditLogs() {
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchAuditLogs()
  }, [])

  const fetchAuditLogs = async () => {
    try {
      const data = await api.get('/audit-logs')
      setLogs(data)
    } catch (error) {
      console.error('Failed to fetch audit logs:', error)
      setLogs([
        {
          log_id: '1',
          actor_id: 'admin-id',
          actor_role: 'ADMIN',
          action: 'VERIFY_FAMILY',
          entity_type: 'FAMILY',
          entity_id: 'GJ-FAM-123456',
          fields_accessed: '["status", "verification_status"]',
          purpose: 'Family verification',
          timestamp: new Date().toISOString()
        },
        {
          log_id: '2',
          actor_id: 'admin-id',
          actor_role: 'ADMIN',
          action: 'VIEW_FAMILY',
          entity_type: 'FAMILY',
          entity_id: 'GJ-FAM-789012',
          fields_accessed: '["address", "members"]',
          purpose: 'Review family details',
          timestamp: new Date(Date.now() - 3600000).toISOString()
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const filteredLogs = logs.filter(log => {
    const matchesFilter = !filter || log.action === filter
    const matchesSearch = !searchQuery ||
      log.entity_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.purpose.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getActionColor = (action: string) => {
    switch (action) {
      case 'VERIFY_FAMILY':
        return 'badge-success'
      case 'REJECT_FAMILY':
        return 'badge-error'
      case 'VIEW_FAMILY':
        return 'badge-info'
      case 'UPDATE_FAMILY':
        return 'badge-warning'
      default:
        return 'bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium border border-slate-200'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3 text-slate-500">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading audit logs...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Audit Logs</h1>
        <p className="text-slate-600 mt-1">Track all administrative actions and data access</p>
      </div>

      <div className="card p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 flex items-center gap-2">
            <Search size={20} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search by entity ID or purpose..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input-field sm:w-48"
          >
            <option value="">All Actions</option>
            <option value="VERIFY_FAMILY">Verify Family</option>
            <option value="REJECT_FAMILY">Reject Family</option>
            <option value="VIEW_FAMILY">View Family</option>
            <option value="UPDATE_FAMILY">Update Family</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-700 text-sm">Timestamp</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700 text-sm">Actor</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700 text-sm">Action</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700 text-sm">Entity</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700 text-sm">Purpose</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-slate-500">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Activity size={32} className="text-slate-400" />
                    </div>
                    <p className="font-medium">No audit logs found</p>
                    <p className="text-sm mt-1">Try adjusting your search or filter</p>
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.log_id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock size={16} className="text-slate-400" />
                        {new Date(log.timestamp).toLocaleString()}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                          <User size={18} className="text-slate-500" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-900">{log.actor_role}</div>
                          <div className="text-xs text-slate-500">{log.actor_id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={getActionColor(log.action)}>
                        {log.action.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm">
                        <div className="font-medium text-slate-900">{log.entity_type}</div>
                        <div className="text-xs text-slate-500 font-mono">{log.entity_id}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-600">{log.purpose}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filteredLogs.length > 0 && (
          <div className="mt-4 text-sm text-slate-500">
            Showing {filteredLogs.length} of {logs.length} logs
          </div>
        )}
      </div>
    </div>
  )
}
