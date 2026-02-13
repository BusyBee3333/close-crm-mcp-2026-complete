// Lead Grid MCP App

export function generateLeadGrid(leads: any[]) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lead Grid</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f7fa; padding: 20px; }
    .container { max-width: 1600px; margin: 0 auto; }
    h1 { font-size: 28px; margin-bottom: 20px; color: #1a1a1a; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
    .card { background: white; border-radius: 8px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); transition: transform 0.2s, box-shadow 0.2s; cursor: pointer; }
    .card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
    .card-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px; }
    .card-title { font-size: 18px; font-weight: 600; color: #1a1a1a; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 500; background: #dbeafe; color: #1e40af; }
    .card-info { font-size: 13px; color: #6b7280; margin-bottom: 8px; }
    .card-meta { display: flex; gap: 16px; margin-top: 12px; padding-top: 12px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <h1>📇 Lead Grid (${leads.length})</h1>
    <div class="grid">
      ${leads.map(lead => `
        <div class="card">
          <div class="card-header">
            <div class="card-title">${lead.name}</div>
            <span class="badge">${lead.status_label || 'No Status'}</span>
          </div>
          ${lead.description ? `<div class="card-info">${lead.description.substring(0, 100)}${lead.description.length > 100 ? '...' : ''}</div>` : ''}
          ${lead.url ? `<div class="card-info">🌐 ${lead.url}</div>` : ''}
          <div class="card-meta">
            <div>👤 ${lead.contacts?.length || 0} contacts</div>
            <div>💼 ${lead.opportunities?.length || 0} opps</div>
          </div>
        </div>
      `).join('')}
    </div>
  </div>
</body>
</html>
  `.trim();
}
