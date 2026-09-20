import { useState } from 'react'
import { AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react'

const MOCK_DUPLICATES = [
  {
    id: 'DUP-901',
    confidence: 85,
    reason: 'Ramesh Patel matches across 2 families (DOB exact match).',
    recordA: {
      familyId: 'GJ-FAM-001245',
      address: '12, M.G. Road, Ward 4, Ahmedabad',
      member: 'Ramesh Patel (62, Head)'
    },
    recordB: {
      familyId: 'GJ-FAM-009876',
      address: '45, High Street, Ward 9, Surat',
      member: 'Ramesh Patel (62, Dependent)'
    },
    status: 'PENDING'
  }
]

const DuplicateReview = () => {
  const [cases, setCases] = useState(MOCK_DUPLICATES)

  const handleResolve = (id: string, action: 'MERGE' | 'SEPARATE') => {
    setCases(prev => prev.map(c => c.id === id ? { ...c, status: action } : c))
  }

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Duplicate Resolution</h1>
          <p className="text-slate-600">Human-in-the-loop review for probabilistic matches</p>
        </div>
        <div className="badge-error flex items-center gap-2">
          <AlertTriangle size={18} /> {cases.filter(c => c.status === 'PENDING').length} Pending Cases
        </div>
      </div>

      <div className="space-y-6">
        {cases.map(c => (
          <div key={c.id} className="card border border-rose-200 overflow-hidden slide-up">
            <div className="bg-rose-50 p-4 border-b border-rose-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-slate-500">{c.id}</span>
                <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded text-sm font-semibold">{c.confidence}% Match</span>
                <span className="text-slate-700 text-sm font-medium">{c.reason}</span>
              </div>
              {c.status !== 'PENDING' && (
                <div className="flex items-center gap-1 text-emerald-600 font-medium">
                  <CheckCircle size={16} /> Resolved: {c.status}
                </div>
              )}
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 relative">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 border border-slate-200 shadow-sm z-10 hidden md:block">
                <AlertTriangle size={20} className="text-amber-500" />
              </div>

              {/* Record A */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wide">Record A</h3>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="font-mono text-blue-600 font-semibold mb-2">{c.recordA.familyId}</div>
                  <div className="text-slate-900 font-medium mb-1">{c.recordA.member}</div>
                  <div className="text-sm text-slate-500">{c.recordA.address}</div>
                </div>
              </div>

              {/* Record B */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wide">Record B (Conflict)</h3>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="font-mono text-blue-600 font-semibold mb-2">{c.recordB.familyId}</div>
                  <div className="text-slate-900 font-medium mb-1">{c.recordB.member}</div>
                  <div className="text-sm text-slate-500">{c.recordB.address}</div>
                </div>
              </div>
            </div>

            {c.status === 'PENDING' && (
              <div className="bg-slate-50 p-4 border-t border-slate-200 flex flex-col sm:flex-row justify-end gap-3">
                <button 
                  onClick={() => handleResolve(c.id, 'SEPARATE')}
                  className="btn-secondary"
                >
                  Mark as Separate Families (Not Duplicate)
                </button>
                <button 
                  onClick={() => handleResolve(c.id, 'MERGE')}
                  className="btn-primary flex items-center justify-center gap-2"
                >
                  Merge Records <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DuplicateReview
