// User Stats MCP App

export function generateUserStats(data: any) {
  const user = data.user || {};
  const stats = data.stats || {};

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${user.first_name || 'User'} ${user.last_name || ''} - Stats</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f7fa; padding: 20px; }
    .container { max-width: 1200px; margin: 0 auto; }
    .header { background: white; padding: 32px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); text-align: center; }
    .avatar { width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 16px; overflow: hidden; background: #e5e7eb; }
    .avatar img { width: 100%; height: 100%; object-fit: cover; }
    h1 { font-size: 28px; color: #1a1a1a; margin-bottom: 4px; }
    .email { color: #6b7280; font-size: 14px; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }
    .stat-card { background: white; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); text-align: center; }
    .stat-icon { font-size: 32px; margin-bottom: 12px; }
    .stat-value { font-size: 36px; font-weight: 700; color: #1a1a1a; margin-bottom: 4px; }
    .stat-label { font-size: 13px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="avatar">
        ${user.image ? `<img src="${user.image}" alt="Avatar">` : '<div style="width: 100%; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 32px; font-weight: 600;">${user.first_name ? user.first_name.charAt(0) : '?'}</div>'}
      </div>
      <h1>${user.first_name || ''} ${user.last_name || ''}</h1>
      <div class="email">${user.email || ''}</div>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">📞</div>
        <div class="stat-value">${stats.calls || 0}</div>
        <div class="stat-label">Calls</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📧</div>
        <div class="stat-value">${stats.emails || 0}</div>
        <div class="stat-label">Emails</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📅</div>
        <div class="stat-value">${stats.meetings || 0}</div>
        <div class="stat-label">Meetings</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">💼</div>
        <div class="stat-value">${stats.opportunities || 0}</div>
        <div class="stat-label">Opportunities</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">✅</div>
        <div class="stat-value">${stats.tasks_completed || 0}</div>
        <div class="stat-label">Tasks Done</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">💰</div>
        <div class="stat-value">$${(stats.revenue || 0).toLocaleString()}</div>
        <div class="stat-label">Revenue</div>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}
