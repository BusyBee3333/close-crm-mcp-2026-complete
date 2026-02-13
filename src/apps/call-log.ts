// Call Log MCP App

export function generateCallLog(calls: any[]) {
  const totalCalls = calls.length;
  const totalDuration = calls.reduce((sum: number, call: any) => sum + (call.duration || 0), 0);
  const avgDuration = totalCalls > 0 ? totalDuration / totalCalls : 0;
  const inbound = calls.filter(c => c.direction === 'inbound').length;
  const outbound = calls.filter(c => c.direction === 'outbound').length;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Call Log</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f7fa; padding: 20px; }
    .container { max-width: 1400px; margin: 0 auto; }
    h1 { font-size: 28px; margin-bottom: 20px; color: #1a1a1a; }
    .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px; }
    .stat-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .stat-label { color: #6b7280; font-size: 13px; text-transform: uppercase; margin-bottom: 8px; }
    .stat-value { font-size: 32px; font-weight: 600; color: #1a1a1a; }
    .table-container { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    table { width: 100%; border-collapse: collapse; }
    th { background: #f9fafb; padding: 12px 16px; text-align: left; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; }
    td { padding: 14px 16px; border-top: 1px solid #e5e7eb; font-size: 14px; }
    tr:hover { background: #f9fafb; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; }
    .badge-inbound { background: #d1fae5; color: #065f46; }
    .badge-outbound { background: #dbeafe; color: #1e40af; }
  </style>
</head>
<body>
  <div class="container">
    <h1>📞 Call Log</h1>

    <div class="stats">
      <div class="stat-card">
        <div class="stat-label">Total Calls</div>
        <div class="stat-value">${totalCalls}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Inbound</div>
        <div class="stat-value" style="color: #059669;">${inbound}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Outbound</div>
        <div class="stat-value" style="color: #3b82f6;">${outbound}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Avg Duration</div>
        <div class="stat-value">${Math.round(avgDuration / 60)}<span style="font-size: 16px; color: #6b7280;">min</span></div>
      </div>
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Direction</th>
            <th>Phone</th>
            <th>Duration</th>
            <th>Disposition</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          ${calls.length > 0 ? calls.map((call: any) => `
            <tr>
              <td>${call.date_created ? new Date(call.date_created).toLocaleString() : 'N/A'}</td>
              <td><span class="badge badge-${call.direction}">${call.direction || 'Unknown'}</span></td>
              <td>${call.phone || 'N/A'}</td>
              <td>${call.duration ? Math.floor(call.duration / 60) + ' min ' + (call.duration % 60) + ' sec' : 'N/A'}</td>
              <td>${call.disposition || 'N/A'}</td>
              <td>${call.user_name || 'N/A'}</td>
            </tr>
          `).join('') : '<tr><td colspan="6" style="text-align: center; padding: 40px; color: #6b7280;">No calls found</td></tr>'}
        </tbody>
      </table>
    </div>
  </div>
</body>
</html>
  `.trim();
}
