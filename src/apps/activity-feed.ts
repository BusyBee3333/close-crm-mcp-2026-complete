// Activity Feed MCP App

export function generateActivityFeed(activities: any[]) {
  const getActivityIcon = (type: string) => {
    const icons: Record<string, string> = {
      note: '📝',
      call: '📞',
      email: '📧',
      sms: '💬',
      meeting: '📅',
    };
    return icons[type] || '📋';
  };

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Activity Feed</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f7fa; padding: 20px; }
    .container { max-width: 900px; margin: 0 auto; }
    h1 { font-size: 28px; margin-bottom: 20px; color: #1a1a1a; }
    .feed { background: white; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .activity { display: flex; gap: 16px; padding: 20px; border-bottom: 1px solid #e5e7eb; }
    .activity:last-child { border-bottom: none; }
    .activity:hover { background: #f9fafb; }
    .activity-icon { font-size: 32px; flex-shrink: 0; }
    .activity-content { flex: 1; }
    .activity-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px; }
    .activity-type { font-weight: 600; font-size: 15px; color: #1a1a1a; }
    .activity-time { font-size: 13px; color: #6b7280; }
    .activity-body { font-size: 14px; color: #374151; line-height: 1.5; }
    .activity-meta { margin-top: 8px; font-size: 12px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <h1>📊 Activity Feed (${activities.length})</h1>
    <div class="feed">
      ${activities.length > 0 ? activities.map((activity: any) => `
        <div class="activity">
          <div class="activity-icon">${getActivityIcon(activity._type)}</div>
          <div class="activity-content">
            <div class="activity-header">
              <div class="activity-type">${activity._type ? activity._type.charAt(0).toUpperCase() + activity._type.slice(1) : 'Activity'}</div>
              <div class="activity-time">${activity.date_created ? new Date(activity.date_created).toLocaleString() : ''}</div>
            </div>
            <div class="activity-body">
              ${activity.note || activity.text || activity.subject || 'No content'}
            </div>
            <div class="activity-meta">
              ${activity.user_name ? `👤 ${activity.user_name}` : ''}
              ${activity.lead_id ? ` • 🏢 Lead: ${activity.lead_id}` : ''}
              ${activity.contact_id ? ` • 👤 Contact: ${activity.contact_id}` : ''}
            </div>
          </div>
        </div>
      `).join('') : '<div style="padding: 40px; text-align: center; color: #6b7280;">No activities found</div>'}
    </div>
  </div>
</body>
</html>
  `.trim();
}
