import React, { useState, useEffect } from 'react';
import { Users, Search, Filter, Plus } from 'lucide-react';

export const LeadsDashboard: React.FC = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const loadLeads = async () => {
    setLoading(true);
    try {
      const result = await window.mcp?.callTool('close_list_leads', {
        query: searchQuery,
        _limit: 50,
      });
      if (result?.content?.[0]?.text) {
        const data = JSON.parse(result.content[0].text);
        setLeads(data.data || []);
      }
    } catch (error) {
      console.error('Failed to load leads:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  return (
    <div style={{ background: '#1a1a1a', color: '#e0e0e0', minHeight: '100vh', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Users size={32} color="#3b82f6" />
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Leads Dashboard</h1>
          </div>
          <button
            onClick={() => window.mcp?.showPrompt('Create a new lead')}
            style={{
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Plus size={16} />
            New Lead
          </button>
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ position: 'relative' }}>
            <Search
              size={20}
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#666' }}
            />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && loadLeads()}
              style={{
                width: '100%',
                background: '#2a2a2a',
                border: '1px solid #3a3a3a',
                color: '#e0e0e0',
                padding: '12px 12px 12px 44px',
                borderRadius: '6px',
                fontSize: '14px',
              }}
            />
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div style={{ background: '#2a2a2a', padding: '16px', borderRadius: '8px', border: '1px solid #3a3a3a' }}>
            <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>Total Leads</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6' }}>{leads.length}</div>
          </div>
          <div style={{ background: '#2a2a2a', padding: '16px', borderRadius: '8px', border: '1px solid #3a3a3a' }}>
            <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>Active</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>
              {leads.filter(l => l.status_label?.toLowerCase().includes('active')).length}
            </div>
          </div>
        </div>

        {/* Leads Table */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>Loading...</div>
        ) : (
          <div style={{ background: '#2a2a2a', borderRadius: '8px', border: '1px solid #3a3a3a', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#333', borderBottom: '1px solid #3a3a3a' }}>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#888' }}>Name</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#888' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#888' }}>Contacts</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#888' }}>Created</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => window.mcp?.showPrompt(`Show details for lead ${lead.id}`)}
                    style={{ borderBottom: '1px solid #3a3a3a', cursor: 'pointer' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#333')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ padding: '12px' }}>
                      <div style={{ fontWeight: '500' }}>{lead.display_name}</div>
                      {lead.url && <div style={{ fontSize: '12px', color: '#666' }}>{lead.url}</div>}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span
                        style={{
                          background: '#3b82f622',
                          color: '#3b82f6',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                        }}
                      >
                        {lead.status_label}
                      </span>
                    </td>
                    <td style={{ padding: '12px', color: '#888' }}>{lead.contacts?.length || 0}</td>
                    <td style={{ padding: '12px', color: '#888', fontSize: '12px' }}>
                      {new Date(lead.date_created).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadsDashboard;
