// Sequence Detail MCP App

export function generateSequenceDetail(data: any) {
  const sequence = data.sequence || {};
  const stats = data.stats || {};

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${sequence.name} - Sequence</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f7fa; padding: 20px; }
    .container { max-width: 1200px; margin: 0 auto; }
    .header { background: white; padding: 32px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    h1 { font-size: 32px; color: #1a1a1a; margin-bottom: 8px; }
    .status-badge { display: inline-block; padding: 6px 14px; border-radius: 16px; font-size: 13px; font-weight: 500; background: #d1fae5; color: #065f46; }
    .grid { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; }
    .card { background: white; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 20px; }
    .card-title { font-size: 18px; font-weight: 600; margin-bottom: 16px; color: #1a1a1a; }
    .field { margin-bottom: 16px; }
    .field-label { font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
    .field-value { font-size: 15px; color: #1a1a1a; }
    .stat-big { text-align: center; padding: 20px; }
    .stat-big-value { font-size: 48px; font-weight: 700; color: #3b82f6; margin-bottom: 8px; }
    .stat-big-label { font-size: 14px; color: #6b7280; text-transform: uppercase; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${sequence.name}</h1>
      <span class="status-badge">${sequence.status || 'Draft'}</span>
    </div>

    <div class="grid">
      <div>
        <div class="card">
          <div class="card-title">Sequence Details</div>
          <div class="field">
            <div class="field-label">Sequence ID</div>
            <div class="field-value">${sequence.id}</div>
          </div>
          ${sequence.max_activations ? `
          <div class="field">
            <div class="field-label">Max Activations</div>
            <div class="field-value">${sequence.max_activations}</div>
          </div>
          ` : ''}
          ${sequence.throttle_capacity ? `
          <div class="field">
            <div class="field-label">Throttle Capacity</div>
            <div class="field-value">${sequence.throttle_capacity} per ${sequence.throttle_period_seconds}s</div>
          </div>
          ` : ''}
          <div class="field">
            <div class="field-label">Created</div>
            <div class="field-value">${sequence.date_created ? new Date(sequence.date_created).toLocaleString() : 'N/A'}</div>
          </div>
          <div class="field">
            <div class="field-label">Last Updated</div>
            <div class="field-value">${sequence.date_updated ? new Date(sequence.date_updated).toLocaleString() : 'N/A'}</div>
          </div>
        </div>
      </div>

      <div>
        ${stats.total_subscriptions !== undefined ? `
        <div class="card">
          <div class="stat-big">
            <div class="stat-big-value">${stats.total_subscriptions || 0}</div>
            <div class="stat-big-label">Total Subscriptions</div>
          </div>
        </div>
        ` : ''}
        ${stats.active_subscriptions !== undefined ? `
        <div class="card">
          <div class="stat-big">
            <div class="stat-big-value" style="color: #059669;">${stats.active_subscriptions || 0}</div>
            <div class="stat-big-label">Active</div>
          </div>
        </div>
        ` : ''}
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}
