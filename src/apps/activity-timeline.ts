// Activity Timeline MCP App

export function generateActivityTimeline(activities: any[]) {
  const sortedActivities = [...activities].sort((a, b) => {
    const dateA = new Date(a.date_created || 0).getTime();
    const dateB = new Date(b.date_created || 0).getTime();
    return dateB - dateA;
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Activity Timeline</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f7fa; padding: 20px; }
    .container { max-width: 1000px; margin: 0 auto; }
    h1 { font-size: 28px; margin-bottom: 20px; color: #1a1a1a; }
    .timeline { position: relative; padding-left: 40px; }
    .timeline::before { content: ''; position: absolute; left: 12px; top: 0; bottom: 0; width: 2px; background: #e5e7eb; }
    .timeline-item { position: relative; margin-bottom: 32px; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .timeline-dot { position: absolute; left: -34px; top: 24px; width: 16px; height: 16px; border-radius: 50%; background: #3b82f6; border: 3px solid white; box-shadow: 0 0 0 2px #3b82f6; }
    .timeline-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px; }
    .timeline-type { font-weight: 600; font-size: 16px; color: #1a1a1a; }
    .timeline-date { font-size: 13px; color: #6b7280; }
    .timeline-content { font-size: 14px; color: #374151; line-height: 1.6; }
    .timeline-meta { margin-top: 12px; padding-top: 12px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <h1>⏱️ Activity Timeline</h1>
    <div class="timeline">
      ${sortedActivities.map((activity: any) => `
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-header">
            <div class="timeline-type">
              ${activity._type === 'note' ? '📝 Note' : 
                activity._type === 'call' ? '📞 Call' :
                activity._type === 'email' ? '📧 Email' :
                activity._type === 'sms' ? '💬 SMS' :
                activity._type === 'meeting' ? '📅 Meeting' : '📋 Activity'}
            </div>
            <div class="timeline-date">${activity.date_created ? new Date(activity.date_created).toLocaleString() : 'Unknown date'}</div>
          </div>
          <div class="timeline-content">
            ${activity.note || activity.text || activity.subject || activity.title || 'No content available'}
          </div>
          <div class="timeline-meta">
            ${activity.user_name ? `Created by ${activity.user_name}` : ''}
            ${activity.lead_id ? ` • Lead: ${activity.lead_id}` : ''}
            ${activity.duration ? ` • Duration: ${Math.floor(activity.duration / 60)} min` : ''}
          </div>
        </div>
      `).join('')}
    </div>
  </div>
</body>
</html>
  `.trim();
}
