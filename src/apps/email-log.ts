// Email Log MCP App

export function generateEmailLog(emails: any[]) {
  const totalEmails = emails.length;
  const sent = emails.filter(e => e.direction === 'outbound').length;
  const received = emails.filter(e => e.direction === 'inbound').length;
  const totalOpens = emails.reduce((sum: number, e: any) => sum + (e.opens || 0), 0);
  const totalClicks = emails.reduce((sum: number, e: any) => sum + (e.clicks || 0), 0);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Log</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f7fa; padding: 20px; }
    .container { max-width: 1400px; margin: 0 auto; }
    h1 { font-size: 28px; margin-bottom: 20px; color: #1a1a1a; }
    .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px; }
    .stat-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .stat-label { color: #6b7280; font-size: 13px; text-transform: uppercase; margin-bottom: 8px; }
    .stat-value { font-size: 32px; font-weight: 600; color: #1a1a1a; }
    .email-list { background: white; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .email-item { padding: 20px; border-bottom: 1px solid #e5e7eb; }
    .email-item:last-child { border-bottom: none; }
    .email-item:hover { background: #f9fafb; }
    .email-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px; }
    .email-subject { font-weight: 600; font-size: 16px; color: #1a1a1a; }
    .email-date { font-size: 13px; color: #6b7280; }
    .email-from { font-size: 14px; color: #6b7280; margin-bottom: 8px; }
    .email-preview { font-size: 14px; color: #374151; line-height: 1.5; }
    .email-meta { margin-top: 12px; display: flex; gap: 16px; font-size: 12px; color: #6b7280; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 500; }
    .badge-sent { background: #dbeafe; color: #1e40af; }
    .badge-received { background: #d1fae5; color: #065f46; }
  </style>
</head>
<body>
  <div class="container">
    <h1>📧 Email Log</h1>

    <div class="stats">
      <div class="stat-card">
        <div class="stat-label">Total Emails</div>
        <div class="stat-value">${totalEmails}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Sent</div>
        <div class="stat-value" style="color: #3b82f6;">${sent}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Received</div>
        <div class="stat-value" style="color: #059669;">${received}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Total Opens</div>
        <div class="stat-value" style="color: #8b5cf6;">${totalOpens}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Total Clicks</div>
        <div class="stat-value" style="color: #f59e0b;">${totalClicks}</div>
      </div>
    </div>

    <div class="email-list">
      ${emails.length > 0 ? emails.map((email: any) => `
        <div class="email-item">
          <div class="email-header">
            <div class="email-subject">${email.subject || 'No Subject'}</div>
            <div class="email-date">${email.date_created ? new Date(email.date_created).toLocaleString() : 'N/A'}</div>
          </div>
          <div class="email-from">
            ${email.direction === 'inbound' ? 'From' : 'To'}: ${email.sender || email.to?.[0] || 'Unknown'}
            <span class="badge badge-${email.direction === 'outbound' ? 'sent' : 'received'}">${email.direction}</span>
          </div>
          ${email.body_text ? `
            <div class="email-preview">${email.body_text.substring(0, 200)}${email.body_text.length > 200 ? '...' : ''}</div>
          ` : ''}
          <div class="email-meta">
            ${email.status ? `<span>Status: ${email.status}</span>` : ''}
            ${email.opens !== undefined ? `<span>📖 ${email.opens} opens</span>` : ''}
            ${email.clicks !== undefined ? `<span>🖱️ ${email.clicks} clicks</span>` : ''}
            ${email.user_name ? `<span>👤 ${email.user_name}</span>` : ''}
          </div>
        </div>
      `).join('') : '<div style="padding: 40px; text-align: center; color: #6b7280;">No emails found</div>'}
    </div>
  </div>
</body>
</html>
  `.trim();
}
