import { Wallet, IndianRupee, History, Building2 } from 'lucide-react'

const MOCK_BENEFITS = [
  {
    id: 'BEN-10492',
    scheme: 'Antyodaya Anna Yojana (AAY)',
    department: 'Food & Civil Supplies',
    status: 'ACTIVE',
    startDate: '2015-04-01',
    value: '35 kg Rice/Wheat per month',
    type: 'IN_KIND'
  },
  {
    id: 'BEN-22019',
    scheme: 'Pre-Matric Scholarship',
    department: 'Education',
    status: 'ACTIVE',
    startDate: '2025-06-15',
    value: '₹3,000 / year',
    type: 'DBT',
    lastPayment: {
      date: '2026-06-20',
      amount: 3000,
      ref: 'PFMS-UTR-901823'
    }
  }
]

const BenefitWallet = () => {
  return (
    <div className="space-y-6 fade-in">
      <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-slate-400 mb-6 font-medium tracking-wide text-sm uppercase">
            <Wallet size={16} /> Kutumb Benefit Index
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-end gap-4">
            <div>
              <p className="text-slate-300 text-lg mb-1">Total DBT Received (FY 26-27)</p>
              <h1 className="text-5xl font-bold text-white flex items-center tracking-tight">
                <IndianRupee size={40} className="mr-1 opacity-80" /> 3,000
              </h1>
            </div>
            <div className="text-right">
              <p className="text-slate-400 text-sm">Active Benefits</p>
              <p className="text-2xl font-semibold">{MOCK_BENEFITS.filter(b => b.status === 'ACTIVE').length}</p>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-white/5 to-transparent pointer-events-none"></div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Active Benefits</h2>
        <div className="grid gap-4">
          {MOCK_BENEFITS.map(benefit => (
            <div key={benefit.id} className="card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 card-hover">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-slate-900">{benefit.scheme}</h3>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 flex items-center gap-1">
                    <Building2 size={12} /> {benefit.department}
                  </span>
                </div>
                <div className="text-slate-600 font-medium mb-1">{benefit.value}</div>
                <div className="text-sm text-slate-400 font-mono">ID: {benefit.id} • Active since {benefit.startDate}</div>
              </div>

              {benefit.type === 'DBT' && benefit.lastPayment && (
                <div className="shrink-0 bg-emerald-50 rounded-xl p-4 border border-emerald-100 w-full sm:w-64">
                  <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <History size={14} /> Last Payment
                  </div>
                  <div className="text-xl font-bold text-slate-900 mb-1">₹{benefit.lastPayment.amount}</div>
                  <div className="text-sm text-slate-500 mb-1">{benefit.lastPayment.date}</div>
                  <div className="text-xs text-slate-400 font-mono" title="PFMS / Bank Reference">Ref: {benefit.lastPayment.ref}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BenefitWallet
