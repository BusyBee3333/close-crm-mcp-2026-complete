// Pipeline Kanban MCP App

export function generatePipelineKanban(data: any) {
  const pipeline = data.pipeline || {};
  const opportunities = data.opportunities || [];
  const statuses = pipeline.statuses || [];

  const oppsByStatus: Record<string, any[]> = {};
  statuses.forEach((status: any) => {
    oppsByStatus[status.id] = opportunities.filter(
      (opp: any) => opp.status_id === status.id
    );
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pipeline.name || 'Pipeline'} - Kanban</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f7fa; padding: 20px; overflow-x: auto; }
    .container { min-width: 1200px; }
    h1 { font-size: 28px; margin-bottom: 20px; color: #1a1a1a; }
    .board { display: flex; gap: 16px; padding-bottom: 20px; }
    .column { background: #e5e7eb; border-radius: 8px; padding: 16px; min-width: 280px; flex-shrink: 0; }
    .column-header { font-size: 14px; font-weight: 600; color: #1a1a1a; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; }
    .column-count { background: #6b7280; color: white; padding: 2px 8px; border-radius: 10px; font-size: 12px; }
    .card { background: white; border-radius: 6px; padding: 14px; margin-bottom: 10px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); cursor: pointer; transition: transform 0.2s; }
    .card:hover { transform: translateY(-2px); box-shadow: 0 2px 8px rgba(0,0,0,0.15); }
    .card-title { font-weight: 600; margin-bottom: 8px; font-size: 14px; }
    .card-value { font-size: 18px; font-weight: 600; color: #059669; margin-bottom: 8px; }
    .card-meta { font-size: 12px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <h1>📊 ${pipeline.name || 'Pipeline Kanban'}</h1>
    <div class="board">
      ${statuses.map((status: any) => {
        const opps = oppsByStatus[status.id] || [];
        const totalValue = opps.reduce((sum: number, opp: any) => sum + (opp.value || 0), 0);
        
        return `
          <div class="column">
            <div class="column-header">
              <span>${status.label}</span>
              <span class="column-count">${opps.length}</span>
            </div>
            ${opps.map((opp: any) => `
              <div class="card">
                <div class="card-title">${opp.lead_name || opp.lead_id}</div>
                <div class="card-value">$${(opp.value || 0).toLocaleString()}</div>
                <div class="card-meta">
                  ${opp.confidence !== undefined ? `${opp.confidence}% confidence` : 'No confidence set'}
                </div>
              </div>
            `).join('')}
            ${opps.length > 0 ? `
              <div style="margin-top: 12px; padding-top: 12px; border-top: 2px solid #d1d5db; font-size: 13px; font-weight: 600; color: #374151;">
                Total: $${totalValue.toLocaleString()}
              </div>
            ` : '<div style="color: #9ca3af; font-size: 13px; text-align: center; padding: 20px;">No opportunities</div>'}
          </div>
        `;
      }).join('')}
    </div>
  </div>
</body>
</html>
  `.trim();
}
