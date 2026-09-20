import { useState, useEffect } from 'react'
import { ShieldCheck, AlertCircle, CheckCircle2, Plus, Search, UserPlus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../utils/api'

const CitizenDashboard = () => {
  const [family, setFamily] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [createFormData, setCreateFormData] = useState({
    address: '',
    district: 'Ahmedabad',
    taluka: '',
    village_or_ward: '',
    household_type: 'KUCCHA',
    members: [{ name: '', date_of_birth: '', gender: 'MALE', relationship: 'HEAD' }],
    attributes: [{ key: 'CASTE', value: '', source: 'CITIZEN_DECLARATION' }]
  })
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFamily = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        if (user.family_id) {
          const data = await api.get(`/families/${user.family_id}`)
          setFamily(data)
        }
      } catch (error) {
        console.error('Failed to fetch family data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFamily()
  }, [])

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    try {
      const results = await api.get(`/families/search?query=${searchQuery}`)
      setSearchResults(results)
    } catch (error) {
      console.error('Search failed:', error)
    }
  }

  const handleCreateFamily = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const data = await api.post('/families', createFormData)
      localStorage.setItem('user', JSON.stringify({
        ...JSON.parse(localStorage.getItem('user') || '{}'),
        family_id: data.family.family_id
      }))
      setFamily(data.family)
      setShowCreateForm(false)
      window.location.reload()
    } catch (error) {
      console.error('Failed to create family:', error)
    }
  }

  const addMember = () => {
    setCreateFormData({
      ...createFormData,
      members: [...createFormData.members, { name: '', date_of_birth: '', gender: 'MALE', relationship: 'MEMBER' }]
    })
  }

  const addAttribute = () => {
    setCreateFormData({
      ...createFormData,
      attributes: [...createFormData.attributes, { key: '', value: '', source: 'CITIZEN_DECLARATION' }]
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3 text-slate-500">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading family data...</span>
        </div>
      </div>
    )
  }

  if (!family) {
    return (
      <div className="space-y-6 fade-in">
        <div className="card p-12 text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <UserPlus size={40} className="text-slate-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-3">No Family Registered</h1>
          <p className="text-slate-600 mb-8 max-w-md mx-auto">You need to create or join a family to access government benefits and schemes</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setShowCreateForm(true)}
              className="btn-primary flex items-center gap-2"
            >
              <UserPlus size={20} />
              Create New Family
            </button>
            <button
              onClick={() => navigate('/citizen/suvidha')}
              className="btn-secondary"
            >
              Search Existing Family
            </button>
          </div>
        </div>

        {showCreateForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 scale-in">
            <div className="card p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Create New Family</h2>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <Plus size={20} className="rotate-45" />
                </button>
              </div>
              <form onSubmit={handleCreateFamily} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Address</label>
                  <input
                    type="text"
                    value={createFormData.address}
                    onChange={(e) => setCreateFormData({ ...createFormData, address: e.target.value })}
                    className="input-field"
                    placeholder="Enter full address"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">District</label>
                    <input
                      type="text"
                      value={createFormData.district}
                      onChange={(e) => setCreateFormData({ ...createFormData, district: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Taluka</label>
                    <input
                      type="text"
                      value={createFormData.taluka}
                      onChange={(e) => setCreateFormData({ ...createFormData, taluka: e.target.value })}
                      className="input-field"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Village/Ward</label>
                  <input
                    type="text"
                    value={createFormData.village_or_ward}
                    onChange={(e) => setCreateFormData({ ...createFormData, village_or_ward: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Household Type</label>
                  <select
                    value={createFormData.household_type}
                    onChange={(e) => setCreateFormData({ ...createFormData, household_type: e.target.value })}
                    className="input-field"
                  >
                    <option value="KUCCHA">Kuccha</option>
                    <option value="PUCCA">Pucca</option>
                    <option value="SEMI_PUCCA">Semi-Pucca</option>
                  </select>
                </div>

                <div className="border-t border-slate-200 pt-5">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-slate-900">Family Members</h3>
                    <button type="button" onClick={addMember} className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition-colors">
                      <Plus size={16} /> Add Member
                    </button>
                  </div>
                  {createFormData.members.map((member, idx) => (
                    <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
                      <input
                        type="text"
                        placeholder="Name"
                        value={member.name}
                        onChange={(e) => {
                          const newMembers = [...createFormData.members]
                          newMembers[idx].name = e.target.value
                          setCreateFormData({ ...createFormData, members: newMembers })
                        }}
                        className="input-field"
                        required
                      />
                      <input
                        type="date"
                        value={member.date_of_birth}
                        onChange={(e) => {
                          const newMembers = [...createFormData.members]
                          newMembers[idx].date_of_birth = e.target.value
                          setCreateFormData({ ...createFormData, members: newMembers })
                        }}
                        className="input-field"
                        required
                      />
                      <select
                        value={member.gender}
                        onChange={(e) => {
                          const newMembers = [...createFormData.members]
                          newMembers[idx].gender = e.target.value
                          setCreateFormData({ ...createFormData, members: newMembers })
                        }}
                        className="input-field"
                      >
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHER">Other</option>
                      </select>
                      <select
                        value={member.relationship}
                        onChange={(e) => {
                          const newMembers = [...createFormData.members]
                          newMembers[idx].relationship = e.target.value
                          setCreateFormData({ ...createFormData, members: newMembers })
                        }}
                        className="input-field"
                      >
                        <option value="HEAD">Head</option>
                        <option value="SPOUSE">Spouse</option>
                        <option value="SON">Son</option>
                        <option value="DAUGHTER">Daughter</option>
                        <option value="FATHER">Father</option>
                        <option value="MOTHER">Mother</option>
                        <option value="MEMBER">Member</option>
                      </select>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-200 pt-5">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-slate-900">Family Attributes</h3>
                    <button type="button" onClick={addAttribute} className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition-colors">
                      <Plus size={16} /> Add Attribute
                    </button>
                  </div>
                  {createFormData.attributes.map((attr, idx) => (
                    <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                      <select
                        value={attr.key}
                        onChange={(e) => {
                          const newAttrs = [...createFormData.attributes]
                          newAttrs[idx].key = e.target.value
                          setCreateFormData({ ...createFormData, attributes: newAttrs })
                        }}
                        className="input-field"
                      >
                        <option value="">Select Attribute</option>
                        <option value="CASTE">Caste</option>
                        <option value="BPL">BPL Status</option>
                        <option value="INCOME">Income</option>
                        <option value="HOUSE_STATUS">House Status</option>
                        <option value="TOILET_STATUS">Toilet Status</option>
                        <option value="LAND_HOLDING">Land Holding</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Value"
                        value={attr.value}
                        onChange={(e) => {
                          const newAttrs = [...createFormData.attributes]
                          newAttrs[idx].value = e.target.value
                          setCreateFormData({ ...createFormData, attributes: newAttrs })
                        }}
                        className="input-field"
                        required
                      />
                      <select
                        value={attr.source}
                        onChange={(e) => {
                          const newAttrs = [...createFormData.attributes]
                          newAttrs[idx].source = e.target.value
                          setCreateFormData({ ...createFormData, attributes: newAttrs })
                        }}
                        className="input-field"
                      >
                        <option value="CITIZEN_DECLARATION">Citizen Declaration</option>
                        <option value="SOCIAL_WELFARE">Social Welfare Dept</option>
                        <option value="FOOD_DEPT">Food Dept</option>
                        <option value="REVENUE">Revenue Dept</option>
                      </select>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 pt-5">
                  <button type="submit" className="flex-1 btn-primary">Create Family</button>
                  <button type="button" onClick={() => setShowCreateForm(false)} className="flex-1 btn-secondary">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Family Profile</h1>
          <p className="text-slate-600 text-sm mt-1">View and manage your family information</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search by Family ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field w-48 sm:w-64"
            />
            <button onClick={handleSearch} className="btn-icon p-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
              <Search size={20} className="text-slate-600" />
            </button>
          </div>
          {family.status === 'VERIFIED' ? (
            <div className="badge-success flex items-center gap-2">
              <ShieldCheck size={16} />
              Verified
            </div>
          ) : family.status === 'REJECTED' ? (
            <div className="badge-error flex items-center gap-2">
              <AlertCircle size={16} />
              Rejected
            </div>
          ) : (
            <div className="badge-warning flex items-center gap-2">
              <AlertCircle size={16} />
              Pending Verification
            </div>
          )}
        </div>
      </div>

      {searchResults.length > 0 && (
        <div className="card p-6 slide-up">
          <h3 className="font-semibold text-slate-900 mb-4">Search Results</h3>
          <div className="space-y-2">
            {searchResults.map((result) => (
              <div key={result.family_id} className="p-4 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer transition-all">
                <div className="font-semibold text-slate-900">{result.family_id}</div>
                <div className="text-sm text-slate-600">{result.address}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info Card */}
        <div className="col-span-1 lg:col-span-2 card p-6 card-hover">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
            <div className="flex-1">
              <div className="text-sm text-slate-500 font-semibold mb-1 uppercase tracking-wide">Current Address</div>
              <div className="text-lg font-semibold text-slate-900">{family.address}</div>
              <div className="text-sm text-slate-600 mt-1">{family.district}, {family.taluka}, {family.village_or_ward}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-500 font-semibold mb-1 uppercase tracking-wide">Data Quality Score</div>
              <div className="text-3xl font-bold text-blue-600">{family.dataQuality || 0}%</div>
            </div>
          </div>

          <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-200 pb-3">Family Members ({family.members?.length || 0})</h2>
          <div className="space-y-3">
            {family.members?.map((m: any) => (
              <div key={m.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm">
                    {m.member?.name?.charAt(0) || '?'}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{m.member?.name || 'Unknown'}</div>
                    <div className="text-sm text-slate-600">{m.relationship} • {Math.floor((new Date().getTime() - new Date(m.member?.date_of_birth).getTime()) / (365.25 * 24 * 60 * 60 * 1000))} years</div>
                  </div>
                </div>
                <div className="text-sm font-mono text-slate-400 bg-white px-3 py-1.5 rounded-lg border border-slate-200">{m.member_id}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Attributes Card */}
        <div className="card p-6 card-hover">
          <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-200 pb-3">Verified Attributes</h2>
          <div className="space-y-4">
            {family.attributes?.map((attr: any) => (
              <div key={attr.id} className="group relative p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-all">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-600 font-medium text-sm">{attr.attribute_key}</span>
                  <span className="font-semibold text-slate-900">{attr.attribute_value}</span>
                </div>
                <div className="flex items-center gap-2">
                  {attr.verification_status === 'VERIFIED' ? (
                    <CheckCircle2 size={14} className="text-emerald-500" />
                  ) : (
                    <AlertCircle size={14} className="text-amber-500" />
                  )}
                  <span className={`text-xs font-medium ${attr.verification_status === 'VERIFIED' ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {attr.verification_status === 'VERIFIED' ? 'Verified' : 'Pending Verification'}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-1">Source: {attr.source_department}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CitizenDashboard
