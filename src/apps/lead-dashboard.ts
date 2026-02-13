// Lead Dashboard MCP App

export function generateLeadDashboard(data: any) {
  const leads = data.leads || [];
  const statuses = data.statuses || [];

  const statusCounts: Record<string, number> = {};
  leads.forEach((lead: any) => {
    const status = lead.status_label || "No Status";
    statusCounts[status] = (statusCounts[status] || 0) + 1;
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Close CRM - Lead Dashboard</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f7fa; padding: 20px; }
    .container { max-width: 1400px; margin: 0 auto; }
    .header { background: white; padding: 24px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    h1 { font-size: 28px; color: #1a1a1a; margin-bottom: 8px; }
    .subtitle { color: #6b7280; font-size: 14px; }
    .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-bottom: 24px; }
    .stat-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .stat-label { color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
    .stat-value { font-size: 32px; font-weight: 600; color: #1a1a1a; }
    .chart-container { background: white; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 20px; }
    .chart-title { font-size: 18px; font-weight: 600; margin-bottom: 16px; color: #1a1a1a; }
    .bar { height: 32px; background: linear-gradient(90deg, #3b82f6, #60a5fa); border-radius: 4px; margin-bottom: 12px; display: flex; align-items: center; padding: 0 12px; color: white; font-size: 13px; font-weight: 500; }
    .leads-table { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    table { width: 100%; border-collapse: collapse; }
    th { background: #f9fafb; padding: 12px 16px; text-align: left; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; }
    td { padding: 14px 16px; border-top: 1px solid #e5e7eb; font-size: 14px; }
    tr:hover { background: #f9fafb; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; }
    .badge-new { background: #dbeafe; color: #1e40af; }
    .badge-potential { background: #fef3c7; color: #92400e; }
    .badge-qualified { background: #d1fae5; color: #065f46; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📊 Lead Dashboard</h1>
      <div class="subtitle">Overview of all leads and statuses</div>
    </div>

    <div class="stats">
      <div class="stat-card">
        <div class="stat-label">Total Leads</div>
        <div class="stat-value">${leads.length}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Unique Statuses</div>
        <div class="stat-value">${Object.keys(statusCounts).length}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Most Common</div>
        <div class="stat-value" style="font-size: 18px;">${Object.entries(statusCounts).sort((a, b) => (b[1] as number) - (a[1] as number))[0]?.[0] || 'N/A'}</div>
      </div>
    </div>

    <div class="chart-container">
      <div class="chart-title">Leads by Status</div>
      ${Object.entries(statusCounts).sort((a, b) => (b[1] as number) - (a[1] as number)).map(([status, count]) => `
        <div class="bar" style="width: ${Math.max(20, (count as number / leads.length) * 100)}%">
          ${status}: ${count}
        </div>
      `).join('')}
    </div>

    <div class="leads-table">
      <table>
        <thead>
          <tr>
            <th>Lead Name</th>
            <th>Status</th>
            <th>Contacts</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          ${leads.slice(0, 50).map((lead: any) => `
            <tr>
              <td><strong>${lead.name || lead.display_name}</strong></td>
              <td><span class="badge badge-potential">${lead.status_label || 'No Status'}</span></td>
              <td>${lead.contacts?.length || 0}</td>
              <td>${lead.date_created ? new Date(lead.date_created).toLocaleDateString() : 'N/A'}</td>
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
