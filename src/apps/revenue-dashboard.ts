// Revenue Dashboard MCP App

export function generateRevenueDashboard(data: any) {
  const opportunities = data.opportunities || [];
  
  const wonOpps = opportunities.filter((o: any) => o.status_type === 'won');
  const activeOpps = opportunities.filter((o: any) => o.status_type === 'active');
  const totalRevenue = wonOpps.reduce((sum: number, o: any) => sum + (o.value || 0), 0);
  const pipelineValue = activeOpps.reduce((sum: number, o: any) => sum + (o.value || 0), 0);
  const weightedValue = activeOpps.reduce((sum: number, o: any) => {
    return sum + ((o.value || 0) * ((o.confidence || 0) / 100));
  }, 0);

  // Group by month
  const revenueByMonth: Record<string, number> = {};
  wonOpps.forEach((opp: any) => {
    if (opp.date_won) {
      const month = new Date(opp.date_won).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
      revenueByMonth[month] = (revenueByMonth[month] || 0) + (opp.value || 0);
    }
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Revenue Dashboard</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f7fa; padding: 20px; }
    .container { max-width: 1400px; margin: 0 auto; }
    h1 { font-size: 28px; margin-bottom: 20px; color: #1a1a1a; }
    .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-bottom: 24px; }
    .stat-card { background: white; padding: 28px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .stat-label { color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; }
    .stat-value { font-size: 42px; font-weight: 700; margin-bottom: 4px; }
    .stat-subtext { color: #6b7280; font-size: 13px; }
    .chart { background: white; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .chart-title { font-size: 20px; font-weight: 600; margin-bottom: 20px; color: #1a1a1a; }
    .bar-container { margin-bottom: 16px; }
    .bar-label { font-size: 13px; color: #6b7280; margin-bottom: 6px; }
    .bar-wrapper { display: flex; gap: 12px; align-items: center; }
    .bar { height: 36px; background: linear-gradient(90deg, #059669, #10b981); border-radius: 4px; display: flex; align-items: center; padding: 0 12px; color: white; font-weight: 600; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>💰 Revenue Dashboard</h1>

    <div class="stats">
      <div class="stat-card">
        <div class="stat-label">Total Revenue</div>
        <div class="stat-value" style="color: #059669;">$${totalRevenue.toLocaleString()}</div>
        <div class="stat-subtext">${wonOpps.length} won opportunities</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Pipeline Value</div>
        <div class="stat-value" style="color: #3b82f6;">$${pipelineValue.toLocaleString()}</div>
        <div class="stat-subtext">${activeOpps.length} active opportunities</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Weighted Pipeline</div>
        <div class="stat-value" style="color: #8b5cf6;">$${Math.round(weightedValue).toLocaleString()}</div>
        <div class="stat-subtext">Based on confidence</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Average Deal Size</div>
        <div class="stat-value" style="color: #f59e0b;">$${wonOpps.length > 0 ? Math.round(totalRevenue / wonOpps.length).toLocaleString() : '0'}</div>
        <div class="stat-subtext">Won opportunities</div>
      </div>
    </div>

    <div class="chart">
      <div class="chart-title">Revenue by Month</div>
      ${Object.entries(revenueByMonth).length > 0 ? Object.entries(revenueByMonth).map(([month, value]) => {
        const maxValue = Math.max(...Object.values(revenueByMonth));
        const widthPercent = Math.max(20, (value / maxValue) * 100);
        
        return `
          <div class="bar-container">
            <div class="bar-label">${month}</div>
            <div class="bar-wrapper">
              <div class="bar" style="width: ${widthPercent}%">
                $${value.toLocaleString()}
              </div>
            </div>
          </div>
        `;
      }).join('') : '<p style="color: #6b7280; text-align: center; padding: 40px;">No revenue data available</p>'}
    </div>
  </div>
</body>
</html>
  `.trim();
}
