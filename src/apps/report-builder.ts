// Report Builder MCP App

export function generateReportBuilder(data: any) {
  const reports = data.reports || [];
  const templates = [
    { name: 'Lead Status Changes', type: 'lead_status_changes' },
    { name: 'Opportunity Funnel', type: 'opportunity_funnel' },
    { name: 'Activity Overview', type: 'activity_overview' },
    { name: 'Revenue Forecast', type: 'revenue_forecast' },
    { name: 'User Leaderboard', type: 'leaderboard' },
  ];

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Report Builder</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f7fa; padding: 20px; }
    .container { max-width: 1400px; margin: 0 auto; }
    h1 { font-size: 28px; margin-bottom: 20px; color: #1a1a1a; }
    .grid { display: grid; grid-template-columns: 1fr 2fr; gap: 20px; }
    .card { background: white; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .card-title { font-size: 18px; font-weight: 600; margin-bottom: 16px; color: #1a1a1a; }
    .template { padding: 14px; border: 1px solid #e5e7eb; border-radius: 6px; margin-bottom: 10px; cursor: pointer; transition: all 0.2s; }
    .template:hover { background: #f9fafb; border-color: #3b82f6; }
    .template-name { font-weight: 600; margin-bottom: 4px; }
    .template-type { font-size: 12px; color: #6b7280; }
    .form-group { margin-bottom: 20px; }
    .label { font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 6px; display: block; }
    .input { width: 100%; padding: 10px 14px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; }
    .btn { padding: 12px 24px; background: #3b82f6; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; }
    .btn:hover { background: #2563eb; }
  </style>
</head>
<body>
  <div class="container">
    <h1>📊 Report Builder</h1>

    <div class="grid">
      <div class="card">
        <div class="card-title">Report Templates</div>
        ${templates.map(template => `
          <div class="template">
            <div class="template-name">${template.name}</div>
            <div class="template-type">${template.type}</div>
          </div>
        `).join('')}
      </div>

      <div class="card">
        <div class="card-title">Build Your Report</div>
        
        <div class="form-group">
          <label class="label">Report Type</label>
          <select class="input">
            <option>Select report type...</option>
            ${templates.map(t => `<option value="${t.type}">${t.name}</option>`).join('')}
          </select>
        </div>

        <div class="form-group">
          <label class="label">Date Range</label>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <input type="date" class="input" placeholder="Start Date">
            <input type="date" class="input" placeholder="End Date">
          </div>
        </div>

        <div class="form-group">
          <label class="label">Filter By User (Optional)</label>
          <input type="text" class="input" placeholder="User ID">
        </div>

        <div class="form-group">
          <label class="label">Filter By Pipeline (Optional)</label>
          <input type="text" class="input" placeholder="Pipeline ID">
        </div>

        <button class="btn">🚀 Generate Report</button>
      </div>
    </div>

    ${reports.length > 0 ? `
    <div class="card" style="margin-top: 20px;">
      <div class="card-title">Recent Reports</div>
      <div style="color: #6b7280; font-size: 14px;">
        ${reports.length} reports generated
      </div>
    </div>
    ` : ''}
  </div>
</body>
</html>
  `.trim();
}
