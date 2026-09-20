import { useState, useEffect } from 'react'
import { Sparkles, Check, ChevronRight, FileCheck2, AlertCircle, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../utils/api'

const SuvidhaPortal = () => {
  const navigate = useNavigate()
  const [entitlements, setEntitlements] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState<string | null>(null)

  useEffect(() => {
    const fetchEntitlements = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        if (user.family_id) {
          const data = await api.get(`/suvidha/entitlements/${user.family_id}`)
          setEntitlements(data.entitlements)
        }
      } catch (error) {
        console.error('Failed to fetch entitlements:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEntitlements()
  }, [])

  const handleApply = async (schemeId: string) => {
    setApplying(schemeId)
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      await api.post('/suvidha/apply', { familyId: user.family_id, schemeId })
      setEntitlements((prev: any) => prev.map((e: any) => e.scheme.scheme_id === schemeId ? { ...e, isEnrolled: true } : e))
    } catch (error) {
      console.error('Failed to apply:', error)
    } finally {
      setApplying(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3 text-slate-500">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading entitlements...</span>
        </div>
      </div>
    )
  }

  const user = JSON.parse(localStorage.getItem('user') || '{}')

  if (!user.family_id) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={32} className="text-amber-600" />
          </div>
          <div className="card p-6 mb-4">
            <p className="font-semibold text-slate-900 mb-1">No Family Registered</p>
            <p className="text-sm text-slate-600">You need to create or join a family to view your entitlements</p>
          </div>
          <button
            onClick={() => navigate('/citizen')}
            className="btn-primary flex items-center gap-2 mx-auto"
          >
            Go to Family Dashboard
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    )
  }

  if (!entitlements || entitlements.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileCheck2 size={32} className="text-slate-400" />
        </div>
        <p className="text-slate-500 font-medium">No entitlements found</p>
        <p className="text-sm text-slate-400 mt-1">Check back later for new schemes</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 fade-in">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-blue-100 mb-3 font-medium tracking-wide text-sm uppercase">
            <Sparkles size={16} /> Suvidha Engine
          </div>
          <h1 className="text-3xl font-bold mb-3">Discover Your Entitlements</h1>
          <p className="text-blue-50 text-lg max-w-2xl">
            We've analyzed your verified family profile against all active government schemes. Here is what you are eligible for. No need to re-submit documents we already have.
          </p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 skew-x-12 translate-x-16 hidden lg:block"></div>
      </div>

      {/* Schemes List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Recommended Schemes</h2>
          <span className="badge-info">{entitlements.length} Available</span>
        </div>

        <div className="grid gap-4">
          {entitlements.map((item: any, idx: number) => {
            const scheme = item.scheme
            return (
              <div key={scheme.scheme_id} className="card p-6 card-hover slide-up" style={{ animationDelay: `${idx * 50}ms` }}>
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-bold text-slate-900">{scheme.name}</h3>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        {scheme.department}
                      </span>
                    </div>

                    <ul className="space-y-2 mb-4">
                      {item.reasons?.map((r: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>

                    {item.isEligible && !item.isEnrolled && (
                      <div className="bg-blue-50 text-blue-700 text-sm p-4 rounded-xl border border-blue-200 flex items-center gap-3">
                        <FileCheck2 size={20} className="text-blue-600" />
                        <div>
                          <strong>Auto-fill ready:</strong> Address, Caste, Income, and Age documents are already verified.
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="shrink-0 flex flex-col items-end gap-3 w-full lg:w-48">
                    {item.isEnrolled && (
                      <div className="w-full text-center py-3 px-4 rounded-xl font-semibold badge-success flex items-center justify-center gap-2">
                        <Check size={18} /> Active Benefit
                      </div>
                    )}

                    {item.isEligible && !item.isEnrolled && (
                      <button
                        onClick={() => handleApply(scheme.scheme_id)}
                        disabled={applying === scheme.scheme_id}
                        className="btn-primary w-full flex items-center justify-center gap-2"
                      >
                        {applying === scheme.scheme_id ? 'Processing...' : (
                          <>
                            Apply Now
                            <ChevronRight size={18} />
                          </>
                        )}
                      </button>
                    )}

                    {!item.isEligible && (
                      <div className="w-full text-center py-3 px-4 rounded-xl font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                        Not Eligible
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SuvidhaPortal
