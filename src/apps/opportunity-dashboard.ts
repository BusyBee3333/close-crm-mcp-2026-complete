// Opportunity Dashboard MCP App

export function generateOpportunityDashboard(data: any) {
  const opportunities = data.opportunities || [];
  
  const totalValue = opportunities.reduce((sum: number, opp: any) => sum + (opp.value || 0), 0);
  const avgValue = opportunities.length > 0 ? totalValue / opportunities.length : 0;
  const wonOpps = opportunities.filter((o: any) => o.status_type === 'won');
  const wonValue = wonOpps.reduce((sum: number, opp: any) => sum + (opp.value || 0), 0);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Opportunity Dashboard</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f7fa; padding: 20px; }
    .container { max-width: 1400px; margin: 0 auto; }
    h1 { font-size: 28px; margin-bottom: 20px; color: #1a1a1a; }
    .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; margin-bottom: 24px; }
    .stat-card { background: white; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .stat-label { color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
    .stat-value { font-size: 36px; font-weight: 600; color: #1a1a1a; }
    .stat-subtext { color: #6b7280; font-size: 13px; margin-top: 4px; }
    .table-container { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    table { width: 100%; border-collapse: collapse; }
    th { background: #f9fafb; padding: 12px 16px; text-align: left; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; }
    td { padding: 14px 16px; border-top: 1px solid #e5e7eb; font-size: 14px; }
    tr:hover { background: #f9fafb; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; }
    .badge-won { background: #d1fae5; color: #065f46; }
    .badge-active { background: #dbeafe; color: #1e40af; }
    .badge-lost { background: #fee2e2; color: #991b1b; }
  </style>
</head>
<body>
  <div class="container">
    <h1>💼 Opportunity Dashboard</h1>

    <div class="stats">
      <div class="stat-card">
        <div class="stat-label">Total Opportunities</div>
        <div class="stat-value">${opportunities.length}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Total Value</div>
        <div class="stat-value">$${totalValue.toLocaleString()}</div>
        <div class="stat-subtext">Across all opportunities</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Average Value</div>
        <div class="stat-value">$${Math.round(avgValue).toLocaleString()}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Won Revenue</div>
        <div class="stat-value" style="color: #059669;">$${wonValue.toLocaleString()}</div>
        <div class="stat-subtext">${wonOpps.length} won opportunities</div>
      </div>
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Lead</th>
            <th>Value</th>
            <th>Status</th>
            <th>Confidence</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          ${opportunities.slice(0, 50).map((opp: any) => `
            <tr>
              <td><strong>${opp.lead_name || opp.lead_id}</strong></td>
              <td>$${(opp.value || 0).toLocaleString()}${opp.value_period ? ` /${opp.value_period}` : ''}</td>
              <td><span class="badge badge-${opp.status_type === 'won' ? 'won' : opp.status_type === 'lost' ? 'lost' : 'active'}">${opp.status_label || opp.status_type || 'Unknown'}</span></td>
              <td>${opp.confidence !== undefined ? opp.confidence + '%' : 'N/A'}</td>
              <td>${opp.date_created ? new Date(opp.date_created).toLocaleDateString() : 'N/A'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </div>
</body>
</html>
  `.trim();
}
