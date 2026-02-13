// Lead Detail MCP App

export function generateLeadDetail(lead: any) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${lead.name} - Lead Detail</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f7fa; padding: 20px; }
    .container { max-width: 1200px; margin: 0 auto; }
    .header { background: white; padding: 24px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    h1 { font-size: 32px; color: #1a1a1a; margin-bottom: 8px; }
    .status-badge { display: inline-block; padding: 6px 14px; border-radius: 16px; font-size: 13px; font-weight: 500; background: #dbeafe; color: #1e40af; }
    .grid { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; }
    .card { background: white; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 20px; }
    .card-title { font-size: 18px; font-weight: 600; margin-bottom: 16px; color: #1a1a1a; }
    .field { margin-bottom: 16px; }
    .field-label { font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
    .field-value { font-size: 15px; color: #1a1a1a; }
    .contact-card { border: 1px solid #e5e7eb; border-radius: 6px; padding: 14px; margin-bottom: 12px; }
    .contact-name { font-weight: 600; margin-bottom: 4px; }
    .contact-info { font-size: 13px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${lead.name}</h1>
      <span class="status-badge">${lead.status_label || 'No Status'}</span>
    </div>

    <div class="grid">
      <div>
        <div class="card">
          <div class="card-title">Lead Information</div>
          <div class="field">
            <div class="field-label">Lead ID</div>
            <div class="field-value">${lead.id}</div>
          </div>
          ${lead.description ? `
          <div class="field">
            <div class="field-label">Description</div>
            <div class="field-value">${lead.description}</div>
          </div>
          ` : ''}
          ${lead.url ? `
          <div class="field">
            <div class="field-label">Website</div>
            <div class="field-value"><a href="${lead.url}" target="_blank">${lead.url}</a></div>
          </div>
          ` : ''}
          <div class="field">
            <div class="field-label">Created</div>
            <div class="field-value">${lead.date_created ? new Date(lead.date_created).toLocaleString() : 'N/A'}</div>
          </div>
          <div class="field">
            <div class="field-label">Last Updated</div>
            <div class="field-value">${lead.date_updated ? new Date(lead.date_updated).toLocaleString() : 'N/A'}</div>
          </div>
        </div>

        <div class="card">
          <div class="card-title">Contacts (${lead.contacts?.length || 0})</div>
          ${lead.contacts && lead.contacts.length > 0 ? lead.contacts.map((contact: any) => `
            <div class="contact-card">
              <div class="contact-name">${contact.name || 'Unnamed Contact'}</div>
              ${contact.title ? `<div class="contact-info">${contact.title}</div>` : ''}
              ${contact.emails && contact.emails.length > 0 ? `<div class="contact-info">📧 ${contact.emails.map((e: any) => e.email).join(', ')}</div>` : ''}
              ${contact.phones && contact.phones.length > 0 ? `<div class="contact-info">📞 ${contact.phones.map((p: any) => p.phone).join(', ')}</div>` : ''}
            </div>
          `).join('') : '<p style="color: #6b7280;">No contacts</p>'}
        </div>
      </div>

      <div>
        <div class="card">
          <div class="card-title">Quick Stats</div>
          <div class="field">
            <div class="field-label">Opportunities</div>
            <div class="field-value" style="font-size: 28px; font-weight: 600;">${lead.opportunities?.length || 0}</div>
          </div>
          <div class="field">
            <div class="field-label">Tasks</div>
            <div class="field-value" style="font-size: 28px; font-weight: 600;">${lead.tasks?.length || 0}</div>
          </div>
        </div>

        ${lead.custom && Object.keys(lead.custom).length > 0 ? `
        <div class="card">
          <div class="card-title">Custom Fields</div>
          ${Object.entries(lead.custom).map(([key, value]) => `
            <div class="field">
              <div class="field-label">${key}</div>
              <div class="field-value">${value}</div>
            </div>
          `).join('')}
        </div>
        ` : ''}
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}
