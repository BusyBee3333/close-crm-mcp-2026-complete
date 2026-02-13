// Smart View Runner MCP App

export function generateSmartViewRunner(data: any) {
  const view = data.view || {};
  const results = data.results || [];

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${view.name} - Smart View</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f7fa; padding: 20px; }
    .container { max-width: 1400px; margin: 0 auto; }
    .header { background: white; padding: 24px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    h1 { font-size: 28px; color: #1a1a1a; margin-bottom: 8px; }
    .query { background: #f9fafb; padding: 12px 16px; border-radius: 6px; font-family: 'Monaco', 'Courier New', monospace; font-size: 13px; color: #374151; margin-top: 12px; }
    .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px; }
    .stat-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .stat-label { color: #6b7280; font-size: 13px; text-transform: uppercase; margin-bottom: 8px; }
    .stat-value { font-size: 32px; font-weight: 600; color: #1a1a1a; }
    .results-table { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    table { width: 100%; border-collapse: collapse; }
    th { background: #f9fafb; padding: 12px 16px; text-align: left; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; }
    td { padding: 14px 16px; border-top: 1px solid #e5e7eb; font-size: 14px; }
    tr:hover { background: #f9fafb; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔍 ${view.name || 'Smart View'}</h1>
      ${view.query ? `<div class="query">${view.query}</div>` : ''}
    </div>

    <div class="stats">
      <div class="stat-card">
        <div class="stat-label">Total Results</div>
        <div class="stat-value">${results.length}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">View Type</div>
        <div class="stat-value" style="font-size: 20px;">${view.type || 'Mixed'}</div>
      </div>
    </div>

    <div class="results-table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Contacts</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          ${results.length > 0 ? results.map((item: any) => `
            <tr>
              <td><strong>${item.name || item.display_name || 'N/A'}</strong></td>
              <td>${item.status_label || 'N/A'}</td>
              <td>${item.contacts?.length || 0}</td>
              <td>${item.date_created ? new Date(item.date_created).toLocaleDateString() : 'N/A'}</td>
            </tr>
          `).join('') : '<tr><td colspan="4" style="text-align: center; padding: 40px; color: #6b7280;">No results found</td></tr>'}
        </tbody>
      </table>
    </div>
  </div>
</body>
</html>
  `.trim();
}
