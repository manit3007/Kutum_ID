import { Clock, CheckCircle2, AlertCircle } from 'lucide-react'

const MOCK_APPLICATIONS = [
  {
    id: 'APP-9021',
    scheme: 'Housing Assistance',
    department: 'Rural Development',
    date: '2026-09-18',
    status: 'UNDER_REVIEW',
    progress: 50,
    nextStep: 'Field Officer Verification',
    missingDocs: ['Bank Passbook Copy']
  },
  {
    id: 'APP-8103',
    scheme: 'Antyodaya Anna Yojana (AAY)',
    department: 'Food & Civil Supplies',
    date: '2026-08-05',
    status: 'APPROVED',
    progress: 100,
    nextStep: 'None',
    missingDocs: []
  }
]

const Applications = () => {
  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Applications</h1>
        <p className="text-slate-600">Track the status of your scheme applications.</p>
      </div>

      <div className="grid gap-6">
        {MOCK_APPLICATIONS.map(app => (
          <div key={app.id} className="card p-6 card-hover slide-up">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-lg font-bold text-slate-900">{app.scheme}</h2>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    {app.department}
                  </span>
                </div>
                <div className="text-sm text-slate-500 font-mono">Application ID: {app.id} • Applied on {app.date}</div>
              </div>
              
              {app.status === 'APPROVED' ? (
                <div className="badge-success flex items-center gap-2">
                  <CheckCircle2 size={18} /> Approved
                </div>
              ) : (
                <div className="badge-warning flex items-center gap-2">
                  <Clock size={18} /> Under Review
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span className="text-slate-600">Progress</span>
                  <span className="text-blue-600">{app.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full transition-all ${app.progress === 100 ? 'bg-emerald-500' : 'bg-blue-600'}`} 
                    style={{ width: `${app.progress}%` }}
                  ></div>
                </div>
              </div>

              {app.status === 'UNDER_REVIEW' && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex-1">
                    <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Next Step</div>
                    <div className="font-medium text-slate-900 flex items-center gap-2">
                      <Clock size={16} className="text-amber-500" /> {app.nextStep}
                    </div>
                  </div>
                  
                  {app.missingDocs.length > 0 && (
                    <div className="flex-1 border-l border-slate-200 sm:pl-8">
                      <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Action Required</div>
                      <ul className="text-sm text-rose-600 font-medium">
                        {app.missingDocs.map((doc, i) => (
                          <li key={i} className="flex items-center gap-1"><AlertCircle size={14} /> Upload {doc}</li>
                        ))}
                      </ul>
                      <button className="mt-2 btn-secondary text-sm">Upload Documents</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Applications
