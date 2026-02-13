// Pipeline Funnel MCP App

export function generatePipelineFunnel(data: any) {
  const pipeline = data.pipeline || {};
  const opportunities = data.opportunities || [];
  const statuses = pipeline.statuses || [];

  const funnelData = statuses.map((status: any) => {
    const opps = opportunities.filter((opp: any) => opp.status_id === status.id);
    const totalValue = opps.reduce((sum: number, opp: any) => sum + (opp.value || 0), 0);
    return {
      label: status.label,
      count: opps.length,
      value: totalValue,
    };
  });

  const maxCount = Math.max(...funnelData.map((d) => d.count), 1);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pipeline.name || 'Pipeline'} - Funnel</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f7fa; padding: 20px; }
    .container { max-width: 1000px; margin: 0 auto; }
    h1 { font-size: 28px; margin-bottom: 20px; color: #1a1a1a; }
    .funnel { background: white; padding: 32px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .funnel-stage { margin-bottom: 20px; }
    .funnel-bar-container { position: relative; }
    .funnel-bar { height: 80px; background: linear-gradient(90deg, #3b82f6, #60a5fa); border-radius: 8px; display: flex; align-items: center; justify-content: space-between; padding: 0 24px; color: white; font-weight: 600; transition: all 0.3s; }
    .funnel-bar:hover { transform: scale(1.02); box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3); }
    .funnel-label { font-size: 18px; }
    .funnel-stats { text-align: right; }
    .funnel-count { font-size: 28px; margin-bottom: 2px; }
    .funnel-value { font-size: 14px; opacity: 0.9; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🔄 ${pipeline.name || 'Pipeline Funnel'}</h1>
    <div class="funnel">
      ${funnelData.map((stage, index) => {
        const widthPercent = Math.max(30, (stage.count / maxCount) * 100);
        const hue = 210 + (index * 15);
        
        return `
          <div class="funnel-stage">
            <div class="funnel-bar-container">
              <div class="funnel-bar" style="width: ${widthPercent}%; background: linear-gradient(90deg, hsl(${hue}, 75%, 55%), hsl(${hue}, 75%, 65%));">
                <div class="funnel-label">${stage.label}</div>
                <div class="funnel-stats">
                  <div class="funnel-count">${stage.count}</div>
                  <div class="funnel-value">$${stage.value.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  </div>
</body>
</html>
  `.trim();
}
