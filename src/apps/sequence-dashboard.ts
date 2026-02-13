// Sequence Dashboard MCP App

export function generateSequenceDashboard(sequences: any[]) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sequence Dashboard</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f7fa; padding: 20px; }
    .container { max-width: 1400px; margin: 0 auto; }
    h1 { font-size: 28px; margin-bottom: 20px; color: #1a1a1a; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 20px; }
    .card { background: white; border-radius: 8px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); transition: transform 0.2s; }
    .card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
    .card-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 16px; }
    .card-title { font-size: 20px; font-weight: 600; color: #1a1a1a; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; }
    .badge-active { background: #d1fae5; color: #065f46; }
    .badge-paused { background: #fef3c7; color: #92400e; }
    .badge-draft { background: #e5e7eb; color: #374151; }
    .stat-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e5e7eb; }
    .stat-row:last-child { border-bottom: none; }
    .stat-label { color: #6b7280; font-size: 13px; }
    .stat-value { font-weight: 600; color: #1a1a1a; }
  </style>
</head>
<body>
  <div class="container">
    <h1>📨 Sequence Dashboard (${sequences.length})</h1>
    <div class="grid">
      ${sequences.map(seq => `
        <div class="card">
          <div class="card-header">
            <div class="card-title">${seq.name}</div>
            <span class="badge badge-${seq.status === 'active' ? 'active' : seq.status === 'paused' ? 'paused' : 'draft'}">
              ${seq.status || 'draft'}
            </span>
          </div>
          <div class="stat-row">
            <div class="stat-label">Sequence ID</div>
            <div class="stat-value">${seq.id}</div>
          </div>
          ${seq.max_activations ? `
          <div class="stat-row">
            <div class="stat-label">Max Activations</div>
            <div class="stat-value">${seq.max_activations}</div>
          </div>
          ` : ''}
          <div class="stat-row">
            <div class="stat-label">Created</div>
            <div class="stat-value">${seq.date_created ? new Date(seq.date_created).toLocaleDateString() : 'N/A'}</div>
          </div>
        </div>
      `).join('')}
    </div>
  </div>
</body>
</html>
  `.trim();
}
