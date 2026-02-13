// Custom Fields Manager MCP App

export function generateCustomFieldsManager(fields: any[]) {
  const fieldsByType: Record<string, any[]> = {};
  fields.forEach(field => {
    const type = field.type || 'unknown';
    if (!fieldsByType[type]) fieldsByType[type] = [];
    fieldsByType[type].push(field);
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Custom Fields Manager</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f7fa; padding: 20px; }
    .container { max-width: 1400px; margin: 0 auto; }
    h1 { font-size: 28px; margin-bottom: 20px; color: #1a1a1a; }
    .section { background: white; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 20px; }
    .section-title { font-size: 20px; font-weight: 600; margin-bottom: 16px; color: #1a1a1a; display: flex; justify-content: space-between; align-items: center; }
    .count { background: #3b82f6; color: white; padding: 4px 12px; border-radius: 12px; font-size: 14px; }
    .fields-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
    .field-card { border: 1px solid #e5e7eb; border-radius: 6px; padding: 16px; background: #f9fafb; }
    .field-name { font-weight: 600; font-size: 16px; color: #1a1a1a; margin-bottom: 8px; }
    .field-info { font-size: 13px; color: #6b7280; margin-bottom: 4px; }
    .badge { display: inline-block; padding: 3px 8px; border-radius: 10px; font-size: 11px; font-weight: 500; margin-right: 6px; }
    .badge-required { background: #fee2e2; color: #991b1b; }
    .badge-multiple { background: #dbeafe; color: #1e40af; }
    .badge-type { background: #e5e7eb; color: #374151; }
  </style>
</head>
<body>
  <div class="container">
    <h1>⚙️ Custom Fields Manager</h1>

    ${Object.entries(fieldsByType).map(([type, typeFields]) => `
      <div class="section">
        <div class="section-title">
          <span>${type.charAt(0).toUpperCase() + type.slice(1)} Fields</span>
          <span class="count">${typeFields.length}</span>
        </div>
        <div class="fields-grid">
          ${typeFields.map(field => `
            <div class="field-card">
              <div class="field-name">${field.name}</div>
              <div style="margin-bottom: 8px;">
                <span class="badge badge-type">${field.type}</span>
                ${field.required ? '<span class="badge badge-required">Required</span>' : ''}
                ${field.accepts_multiple_values ? '<span class="badge badge-multiple">Multiple</span>' : ''}
              </div>
              <div class="field-info">ID: ${field.id}</div>
              ${field.choices && field.choices.length > 0 ? `
                <div class="field-info">Choices: ${field.choices.join(', ')}</div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `).join('')}
  </div>
</body>
</html>
  `.trim();
}
