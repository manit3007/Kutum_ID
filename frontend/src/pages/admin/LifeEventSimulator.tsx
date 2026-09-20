import { useState } from 'react'
import { Activity, UserPlus, FileX, ArrowRightLeft, Heart, CheckCircle2 } from 'lucide-react'

const LifeEventSimulator = () => {
  const [log, setLog] = useState<string[]>([])
  
  const simulateEvent = (event: string, details: string) => {
    setLog(prev => [`[${new Date().toLocaleTimeString()}] Simulated ${event}: ${details}`, ...prev])
  }

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Life Event Engine Simulation</h1>
        <p className="text-slate-600">Trigger synthetic life events to observe dynamic eligibility recalculation.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Trigger Events</h2>
          
          <button 
            onClick={() => simulateEvent('BIRTH', 'Created candidate member GJ-MEM-5002 in Family GJ-FAM-001245')}
            className="w-full card p-4 flex items-center justify-between hover:bg-slate-50 transition border border-emerald-200 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                <UserPlus size={24} />
              </div>
              <div className="text-left">
                <div className="font-bold text-slate-900 group-hover:text-emerald-700 transition">Register Birth Event</div>
                <div className="text-sm text-slate-500">Adds new member & recalculates per-capita limits</div>
              </div>
            </div>
          </button>

          <button 
            onClick={() => simulateEvent('DEATH', 'Marked GJ-MEM-1001 as DECEASED. Triggering pension stop rules.')}
            className="w-full card p-4 flex items-center justify-between hover:bg-slate-50 transition border border-rose-200 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-rose-600">
                <FileX size={24} />
              </div>
              <div className="text-left">
                <div className="font-bold text-slate-900 group-hover:text-rose-700 transition">Register Death Event</div>
                <div className="text-sm text-slate-500">Flags member, notifies DBT to pause benefits</div>
              </div>
            </div>
          </button>

          <button 
            onClick={() => simulateEvent('MARRIAGE', 'Priya Patel (GJ-MEM-1004) married. Initiating Family Split.')}
            className="w-full card p-4 flex items-center justify-between hover:bg-slate-50 transition border border-purple-200 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-600">
                <Heart size={24} />
              </div>
              <div className="text-left">
                <div className="font-bold text-slate-900 group-hover:text-purple-700 transition">Register Marriage Event</div>
                <div className="text-sm text-slate-500">Splits family, updates historic memberships</div>
              </div>
            </div>
          </button>

          <button 
            onClick={() => simulateEvent('MIGRATION', 'Family GJ-FAM-001245 address updated to Surat. Checking portability.')}
            className="w-full card p-4 flex items-center justify-between hover:bg-slate-50 transition border border-amber-200 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-600">
                <ArrowRightLeft size={24} />
              </div>
              <div className="text-left">
                <div className="font-bold text-slate-900 group-hover:text-amber-700 transition">Register Migration Event</div>
                <div className="text-sm text-slate-500">Updates address & re-evaluates ward-level rules</div>
              </div>
            </div>
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Event Processing Log</h2>
            <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
              <Activity size={16} className="animate-pulse" /> Engine Active
            </div>
          </div>
          
          <div className="bg-slate-900 rounded-2xl p-6 h-[400px] overflow-auto border border-slate-800 shadow-inner">
            {log.length === 0 ? (
              <div className="text-slate-500 text-sm italic text-center mt-32">Waiting for events...</div>
            ) : (
              <div className="space-y-3 font-mono text-sm">
                {log.map((entry, idx) => (
                  <div key={idx} className="text-slate-300 border-l-2 border-blue-600 pl-3">
                    <span className="text-blue-600 mr-2">{'>'}</span>{entry}
                    <div className="text-emerald-400 text-xs mt-1 flex items-center gap-1">
                      <CheckCircle2 size={12} /> Recalculation Complete
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LifeEventSimulator
