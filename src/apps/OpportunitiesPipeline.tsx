import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Target } from 'lucide-react';

export const OpportunitiesPipeline: React.FC = () => {
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [pipelines, setPipelines] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [oppsResult, pipelinesResult] = await Promise.all([
        window.mcp?.callTool('close_list_opportunities', { _limit: 100 }),
        window.mcp?.callTool('close_get_opportunity_pipelines', {}),
      ]);

      if (oppsResult?.content?.[0]?.text) {
        const data = JSON.parse(oppsResult.content[0].text);
        setOpportunities(data.data || []);
      }
      if (pipelinesResult?.content?.[0]?.text) {
        const data = JSON.parse(pipelinesResult.content[0].text);
        setPipelines(data.data || []);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalValue = opportunities.reduce((sum, opp) => sum + (opp.value || 0), 0) / 100;
  const activeOpps = opportunities.filter(o => o.status_type === 'active').length;
  const wonOpps = opportunities.filter(o => o.status_type === 'won').length;

  return (
    <div style={{ background: '#1a1a1a', color: '#e0e0e0', minHeight: '100vh', padding: '20px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <TrendingUp size={32} color="#10b981" />
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Opportunities Pipeline</h1>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          <div style={{ background: '#2a2a2a', padding: '20px', borderRadius: '8px', border: '1px solid #3a3a3a' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <DollarSign size={20} color="#10b981" />
              <span style={{ fontSize: '12px', color: '#888' }}>Total Pipeline Value</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#10b981' }}>
              ${totalValue.toLocaleString()}
            </div>
          </div>
          <div style={{ background: '#2a2a2a', padding: '20px', borderRadius: '8px', border: '1px solid #3a3a3a' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <Target size={20} color="#3b82f6" />
              <span style={{ fontSize: '12px', color: '#888' }}>Active Opportunities</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#3b82f6' }}>
              {activeOpps}
            </div>
          </div>
          <div style={{ background: '#2a2a2a', padding: '20px', borderRadius: '8px', border: '1px solid #3a3a3a' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <TrendingUp size={20} color="#f59e0b" />
              <span style={{ fontSize: '12px', color: '#888' }}>Won This Month</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#f59e0b' }}>
              {wonOpps}
            </div>
          </div>
        </div>

        {/* Pipeline Board */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>Loading pipeline...</div>
        ) : (
          <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '16px' }}>
            {['active', 'won', 'lost'].map((statusType) => {
              const statusOpps = opportunities.filter(o => o.status_type === statusType);
              const statusValue = statusOpps.reduce((sum, opp) => sum + (opp.value || 0), 0) / 100;

              return (
                <div
                  key={statusType}
                  style={{
                    minWidth: '320px',
                    background: '#2a2a2a',
                    borderRadius: '8px',
                    border: '1px solid #3a3a3a',
                    padding: '16px',
                  }}
                >
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', textTransform: 'capitalize', marginBottom: '4px' }}>
                      {statusType}
                    </div>
                    <div style={{ fontSize: '12px', color: '#888' }}>
                      {statusOpps.length} deals · ${statusValue.toLocaleString()}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {statusOpps.map((opp) => (
                      <div
                        key={opp.id}
                        onClick={() => window.mcp?.showPrompt(`Show opportunity ${opp.id}`)}
                        style={{
                          background: '#333',
                          border: '1px solid #3a3a3a',
                          borderRadius: '6px',
                          padding: '12px',
                          cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#3b82f6')}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#3a3a3a')}
                      >
                        <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>
                          {opp.lead_name || `Opportunity ${opp.id.slice(0, 8)}`}
                        </div>
                        <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#10b981', marginBottom: '4px' }}>
                          ${((opp.value || 0) / 100).toLocaleString()}
                        </div>
                        {opp.confidence !== undefined && (
                          <div style={{ fontSize: '11px', color: '#888' }}>
                            {opp.confidence}% confidence
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OpportunitiesPipeline;
