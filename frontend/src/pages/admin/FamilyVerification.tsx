import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, FileText, Download, Eye, Shield } from 'lucide-react'
import { api } from '../../utils/api'

export default function FamilyVerification() {
  const [families, setFamilies] = useState<any[]>([])
  const [selectedFamily, setSelectedFamily] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPendingFamilies()
  }, [])

  const fetchPendingFamilies = async () => {
    try {
      const allFamilies = await api.get('/families/search?query=')
      const pendingFamilies = allFamilies.filter((f: any) => f.status === 'PENDING_VERIFICATION')
      setFamilies(pendingFamilies)
    } catch (error) {
      console.error('Failed to fetch families:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (familyId: string) => {
    try {
      await api.post(`/families/${familyId}/verify`, { status: 'VERIFIED' })
      fetchPendingFamilies()
      setSelectedFamily(null)
    } catch (error) {
      console.error('Failed to approve family:', error)
    }
  }

  const handleReject = async (familyId: string) => {
    try {
      await api.post(`/families/${familyId}/verify`, { status: 'REJECTED' })
      fetchPendingFamilies()
      setSelectedFamily(null)
    } catch (error) {
      console.error('Failed to reject family:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3 text-slate-500">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading pending verifications...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Family Verification</h1>
        <p className="text-slate-600 mt-1">Review and verify family declarations submitted by citizens</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Family List */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900">Pending Verifications</h2>
            <span className="badge-info">{families.length}</span>
          </div>
          <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
            {families.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield size={32} className="text-slate-400" />
                </div>
                <p className="font-medium">No pending verifications</p>
                <p className="text-sm mt-1">All families have been reviewed</p>
              </div>
            ) : (
              families.map((family) => (
                <div
                  key={family.family_id}
                  onClick={() => setSelectedFamily(family)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all
                    ${selectedFamily?.family_id === family.family_id
                      ? 'bg-blue-50 border-blue-500 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                    }`}
                >
                  <div className="font-semibold text-slate-900">{family.family_id}</div>
                  <div className="text-sm text-slate-600 mt-1">{family.address}</div>
                  <div className="text-xs text-slate-500 mt-2">
                    {family.members?.length || 0} members
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Family Details */}
        <div className="col-span-1 lg:col-span-2 card p-6">
          {selectedFamily ? (
            <div className="space-y-6 slide-up">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-slate-900">{selectedFamily.family_id}</h2>
                  <p className="text-slate-600 mt-1">{selectedFamily.address}</p>
                  <p className="text-sm text-slate-500 mt-1">
                    {selectedFamily.district}, {selectedFamily.taluka}, {selectedFamily.village_or_ward}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(selectedFamily.family_id)}
                    className="btn-primary flex items-center gap-2"
                  >
                    <CheckCircle size={18} /> Approve
                  </button>
                  <button
                    onClick={() => handleReject(selectedFamily.family_id)}
                    className="btn-secondary flex items-center gap-2 text-red-600 hover:text-red-700 hover:border-red-300"
                  >
                    <XCircle size={18} /> Reject
                  </button>
                </div>
              </div>

              {/* Documents Section */}
              <div className="border-t border-slate-200 pt-6">
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <FileText size={18} />
                  Uploaded Documents
                </h3>
                {selectedFamily.documents && selectedFamily.documents.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedFamily.documents.map((doc: any, idx: number) => (
                      <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50 hover:border-slate-300 transition-all">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-900">{doc.name}</span>
                          <div className="flex gap-2">
                            <button className="text-blue-600 hover:text-blue-700 p-1 hover:bg-blue-50 rounded-lg transition-colors">
                              <Eye size={16} />
                            </button>
                            <button className="text-slate-600 hover:text-slate-700 p-1 hover:bg-slate-100 rounded-lg transition-colors">
                              <Download size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="text-xs text-slate-500 mt-2">{doc.type}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FileText size={24} className="text-slate-400" />
                    </div>
                    <p className="text-slate-600 font-medium">No documents uploaded</p>
                    <p className="text-sm text-slate-500 mt-1">Citizen has not uploaded any supporting documents</p>
                  </div>
                )}
              </div>

              {/* Family Members */}
              <div className="border-t border-slate-200 pt-6">
                <h3 className="font-semibold text-slate-900 mb-4">Family Members</h3>
                <div className="space-y-3">
                  {selectedFamily.members?.map((m: any) => (
                    <div key={m.member_id} className="p-4 border border-slate-200 rounded-xl bg-slate-50 hover:border-slate-300 transition-all">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-slate-900">{m.member?.name}</div>
                          <div className="text-sm text-slate-600">{m.relationship}</div>
                        </div>
                        <div className="text-sm text-slate-500">
                          {new Date(m.member?.date_of_birth).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Family Attributes */}
              <div className="border-t border-slate-200 pt-6">
                <h3 className="font-semibold text-slate-900 mb-4">Declared Attributes</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedFamily.attributes?.map((attr: any) => (
                    <div key={attr.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50 hover:border-slate-300 transition-all">
                      <div className="text-sm text-slate-600 font-medium">{attr.attribute_key}</div>
                      <div className="font-semibold text-slate-900 mt-1">{attr.attribute_value}</div>
                      <div className="text-xs text-slate-500 mt-2">
                        Source: {attr.source_department}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-slate-500">
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText size={32} className="text-slate-400" />
                </div>
                <p className="font-medium">Select a family to view details</p>
                <p className="text-sm mt-1">Choose from the pending verifications list</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
