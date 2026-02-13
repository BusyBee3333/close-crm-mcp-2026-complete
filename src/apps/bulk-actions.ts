// Bulk Actions MCP App

export function generateBulkActions(data: any) {
  const leads = data.leads || [];
  const selectedCount = data.selectedCount || leads.length;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bulk Actions</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f7fa; padding: 20px; }
    .container { max-width: 1200px; margin: 0 auto; }
    h1 { font-size: 28px; margin-bottom: 20px; color: #1a1a1a; }
    .toolbar { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 20px; display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
    .selection-count { font-weight: 600; color: #3b82f6; padding: 8px 16px; background: #dbeafe; border-radius: 6px; }
    .btn { padding: 10px 20px; border-radius: 6px; border: none; font-weight: 500; cursor: pointer; transition: all 0.2s; font-size: 14px; }
    .btn:hover { transform: translateY(-1px); box-shadow: 0 2px 8px rgba(0,0,0,0.15); }
    .btn-primary { background: #3b82f6; color: white; }
    .btn-danger { background: #dc2626; color: white; }
    .btn-secondary { background: #6b7280; color: white; }
    .table-container { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    table { width: 100%; border-collapse: collapse; }
    th { background: #f9fafb; padding: 12px 16px; text-align: left; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; }
    td { padding: 14px 16px; border-top: 1px solid #e5e7eb; font-size: 14px; }
    tr:hover { background: #f9fafb; }
    .checkbox { width: 18px; height: 18px; cursor: pointer; }
  </style>
</head>
<body>
  <div class="container">
    <h1>⚡ Bulk Actions</h1>

    <div class="toolbar">
      <div class="selection-count">${selectedCount} selected</div>
      <button class="btn btn-primary">📝 Edit Fields</button>
      <button class="btn btn-secondary">🏷️ Change Status</button>
      <button class="btn btn-secondary">📧 Send Email</button>
      <button class="btn btn-secondary">📞 Log Call</button>
      <button class="btn btn-danger">🗑️ Delete</button>
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th style="width: 40px;"><input type="checkbox" class="checkbox" checked></th>
            <th>Lead Name</th>
            <th>Status</th>
            <th>Contacts</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          ${leads.slice(0, 50).map(lead => `
            <tr>
              <td><input type="checkbox" class="checkbox" checked></td>
              <td><strong>${lead.name || lead.display_name}</strong></td>
              <td>${lead.status_label || 'No Status'}</td>
              <td>${lead.contacts?.length || 0}</td>
              <td>${lead.date_created ? new Date(lead.date_created).toLocaleDateString() : 'N/A'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </div>
</body>
</html>
  `.trim();
}
