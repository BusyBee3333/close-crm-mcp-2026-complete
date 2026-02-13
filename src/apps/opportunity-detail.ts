// Opportunity Detail MCP App

export function generateOpportunityDetail(opportunity: any) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Opportunity Detail</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f7fa; padding: 20px; }
    .container { max-width: 1000px; margin: 0 auto; }
    .header { background: white; padding: 32px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .value { font-size: 48px; font-weight: 700; color: #059669; margin-bottom: 8px; }
    .status { display: inline-block; padding: 6px 14px; border-radius: 16px; font-size: 14px; font-weight: 500; background: #dbeafe; color: #1e40af; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .card { background: white; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .card-title { font-size: 18px; font-weight: 600; margin-bottom: 16px; color: #1a1a1a; }
    .field { margin-bottom: 16px; }
    .field-label { font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
    .field-value { font-size: 15px; color: #1a1a1a; }
    .confidence-bar { height: 8px; background: #e5e7eb; border-radius: 4px; overflow: hidden; margin-top: 8px; }
    .confidence-fill { height: 100%; background: linear-gradient(90deg, #3b82f6, #60a5fa); transition: width 0.3s; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="value">$${(opportunity.value || 0).toLocaleString()}</div>
      <span class="status">${opportunity.status_label || opportunity.status_type || 'Unknown Status'}</span>
      ${opportunity.value_period ? `<div style="color: #6b7280; margin-top: 8px; font-size: 14px;">per ${opportunity.value_period}</div>` : ''}
    </div>

    <div class="grid">
      <div class="card">
        <div class="card-title">Opportunity Details</div>
        <div class="field">
          <div class="field-label">Opportunity ID</div>
          <div class="field-value">${opportunity.id}</div>
        </div>
        <div class="field">
          <div class="field-label">Lead ID</div>
          <div class="field-value">${opportunity.lead_id}</div>
        </div>
        <div class="field">
          <div class="field-label">Status ID</div>
          <div class="field-value">${opportunity.status_id}</div>
        </div>
        ${opportunity.user_name ? `
        <div class="field">
          <div class="field-label">Owner</div>
          <div class="field-value">${opportunity.user_name}</div>
        </div>
        ` : ''}
        ${opportunity.note ? `
        <div class="field">
          <div class="field-label">Notes</div>
          <div class="field-value">${opportunity.note}</div>
        </div>
        ` : ''}
      </div>

      <div class="card">
        <div class="card-title">Metrics</div>
        <div class="field">
          <div class="field-label">Confidence</div>
          <div class="field-value">${opportunity.confidence !== undefined ? opportunity.confidence + '%' : 'Not set'}</div>
          ${opportunity.confidence !== undefined ? `
            <div class="confidence-bar">
              <div class="confidence-fill" style="width: ${opportunity.confidence}%"></div>
            </div>
          ` : ''}
        </div>
        <div class="field">
          <div class="field-label">Created</div>
          <div class="field-value">${opportunity.date_created ? new Date(opportunity.date_created).toLocaleString() : 'N/A'}</div>
        </div>
        <div class="field">
          <div class="field-label">Last Updated</div>
          <div class="field-value">${opportunity.date_updated ? new Date(opportunity.date_updated).toLocaleString() : 'N/A'}</div>
        </div>
        ${opportunity.date_won ? `
        <div class="field">
          <div class="field-label">Won Date</div>
          <div class="field-value">${new Date(opportunity.date_won).toLocaleString()}</div>
        </div>
        ` : ''}
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}
