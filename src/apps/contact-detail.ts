// Contact Detail MCP App

export function generateContactDetail(contact: any) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${contact.name} - Contact Detail</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f7fa; padding: 20px; }
    .container { max-width: 900px; margin: 0 auto; }
    .header { background: white; padding: 32px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); text-align: center; }
    .avatar { width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; font-size: 36px; color: white; margin: 0 auto 16px; }
    h1 { font-size: 28px; color: #1a1a1a; margin-bottom: 4px; }
    .title { color: #6b7280; font-size: 16px; }
    .card { background: white; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 20px; }
    .card-title { font-size: 18px; font-weight: 600; margin-bottom: 16px; color: #1a1a1a; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; }
    .info-row { display: flex; align-items: center; padding: 12px; border-radius: 6px; margin-bottom: 8px; background: #f9fafb; }
    .info-icon { font-size: 20px; margin-right: 12px; }
    .info-content { flex: 1; }
    .info-label { font-size: 11px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; }
    .info-value { font-size: 15px; color: #1a1a1a; margin-top: 2px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="avatar">${contact.name ? contact.name.charAt(0).toUpperCase() : '?'}</div>
      <h1>${contact.name || 'Unnamed Contact'}</h1>
      ${contact.title ? `<div class="title">${contact.title}</div>` : ''}
    </div>

    <div class="card">
      <div class="card-title">Contact Information</div>
      
      ${contact.emails && contact.emails.length > 0 ? `
        <div class="info-row">
          <div class="info-icon">📧</div>
          <div class="info-content">
            <div class="info-label">Email Addresses</div>
            ${contact.emails.map((e: any) => `
              <div class="info-value">${e.email}${e.type ? ` (${e.type})` : ''}</div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${contact.phones && contact.phones.length > 0 ? `
        <div class="info-row">
          <div class="info-icon">📞</div>
          <div class="info-content">
            <div class="info-label">Phone Numbers</div>
            ${contact.phones.map((p: any) => `
              <div class="info-value">${p.phone}${p.type ? ` (${p.type})` : ''}</div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${contact.urls && contact.urls.length > 0 ? `
        <div class="info-row">
          <div class="info-icon">🔗</div>
          <div class="info-content">
            <div class="info-label">URLs</div>
            ${contact.urls.map((u: any) => `
              <div class="info-value"><a href="${u.url}" target="_blank">${u.url}</a>${u.type ? ` (${u.type})` : ''}</div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>

    <div class="card">
      <div class="card-title">Metadata</div>
      <div class="info-row">
        <div class="info-icon">🆔</div>
        <div class="info-content">
          <div class="info-label">Contact ID</div>
          <div class="info-value">${contact.id}</div>
        </div>
      </div>
      ${contact.lead_id ? `
      <div class="info-row">
        <div class="info-icon">🏢</div>
        <div class="info-content">
          <div class="info-label">Lead ID</div>
          <div class="info-value">${contact.lead_id}</div>
        </div>
      </div>
      ` : ''}
      <div class="info-row">
        <div class="info-icon">📅</div>
        <div class="info-content">
          <div class="info-label">Created</div>
          <div class="info-value">${contact.date_created ? new Date(contact.date_created).toLocaleString() : 'N/A'}</div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}
