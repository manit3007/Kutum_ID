import { Users, AlertTriangle, CheckCircle, FileX } from 'lucide-react'

const AdminDashboard = () => {
  return (
    <div className="space-y-8 fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Overview</h1>
        <p className="text-slate-600">Ahmedabad District Governance Dashboard</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6 border-l-4 border-blue-600 card-hover">
          <div className="flex justify-between items-start mb-2">
            <div className="text-slate-600 font-medium">Verified Families</div>
            <div className="bg-blue-50 text-blue-600 p-2 rounded-lg"><Users size={20} /></div>
          </div>
          <div className="text-3xl font-bold text-slate-900">1.2M</div>
          <div className="text-sm text-emerald-600 mt-2 font-medium flex items-center gap-1"><CheckCircle size={14}/> +2.4% this month</div>
        </div>
        
        <div className="card p-6 border-l-4 border-emerald-500 card-hover">
          <div className="flex justify-between items-start mb-2">
            <div className="text-slate-600 font-medium">Eligible & Unenrolled</div>
            <div className="bg-emerald-50 text-emerald-600 p-2 rounded-lg"><FileX size={20} /></div>
          </div>
          <div className="text-3xl font-bold text-slate-900">45.2K</div>
          <div className="text-sm text-amber-600 mt-2 font-medium flex items-center gap-1"><AlertTriangle size={14}/> Action Required</div>
        </div>

        <div className="card p-6 border-l-4 border-amber-500 card-hover">
          <div className="flex justify-between items-start mb-2">
            <div className="text-slate-600 font-medium">Pending Verifications</div>
            <div className="bg-amber-50 text-amber-600 p-2 rounded-lg"><AlertTriangle size={20} /></div>
          </div>
          <div className="text-3xl font-bold text-slate-900">12,403</div>
          <div className="text-sm text-slate-500 mt-2 font-medium">Requires field officer visit</div>
        </div>

        <div className="card p-6 border-l-4 border-rose-500 card-hover">
          <div className="flex justify-between items-start mb-2">
            <div className="text-slate-600 font-medium">Duplicate Alerts</div>
            <div className="bg-rose-50 text-rose-600 p-2 rounded-lg"><AlertTriangle size={20} /></div>
          </div>
          <div className="text-3xl font-bold text-slate-900">842</div>
          <div className="text-sm text-rose-600 mt-2 font-medium flex items-center gap-1">High Priority</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card p-6 card-hover">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Life Events Processing</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-all">
              <div>
                <div className="font-semibold text-slate-900">Marriage Reported</div>
                <div className="text-sm text-slate-500">Family ID: GJ-FAM-001245 • 2 hours ago</div>
              </div>
              <button className="btn-secondary text-sm">Review Split</button>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-all">
              <div>
                <div className="font-semibold text-slate-900">Death Event Sync (Civil Reg.)</div>
                <div className="text-sm text-slate-500">Member ID: GJ-MEM-4091 • 5 hours ago</div>
              </div>
              <span className="badge-success">Auto-Resolved</span>
            </div>
          </div>
        </div>

        <div className="card p-6 card-hover">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Deprivation Outreach Targets</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl transition">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                <span className="font-medium text-slate-700">D1: Kuccha House</span>
              </div>
              <span className="font-semibold text-slate-900">14,200</span>
            </div>
            <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl transition">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <span className="font-medium text-slate-700">D2: Female-headed</span>
              </div>
              <span className="font-semibold text-slate-900">8,450</span>
            </div>
            <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl transition">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="font-medium text-slate-700">D4: Disabled Member</span>
              </div>
              <span className="font-semibold text-slate-900">2,104</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
