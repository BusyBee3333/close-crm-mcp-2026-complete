// Task Manager MCP App

export function generateTaskManager(tasks: any[]) {
  const incompleteTasks = tasks.filter(t => !t.is_complete);
  const completedTasks = tasks.filter(t => t.is_complete);
  const overdueTasks = incompleteTasks.filter(t => {
    if (!t.date) return false;
    return new Date(t.date) < new Date();
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Task Manager</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f7fa; padding: 20px; }
    .container { max-width: 1200px; margin: 0 auto; }
    h1 { font-size: 28px; margin-bottom: 20px; color: #1a1a1a; }
    .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px; }
    .stat-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .stat-label { color: #6b7280; font-size: 13px; text-transform: uppercase; margin-bottom: 8px; }
    .stat-value { font-size: 32px; font-weight: 600; }
    .section { background: white; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 20px; }
    .section-title { font-size: 20px; font-weight: 600; margin-bottom: 16px; color: #1a1a1a; }
    .task { display: flex; align-items: start; gap: 12px; padding: 14px; border-radius: 6px; margin-bottom: 10px; background: #f9fafb; }
    .task:hover { background: #f3f4f6; }
    .checkbox { width: 20px; height: 20px; border: 2px solid #d1d5db; border-radius: 4px; flex-shrink: 0; margin-top: 2px; }
    .checkbox.checked { background: #059669; border-color: #059669; position: relative; }
    .checkbox.checked::after { content: '✓'; position: absolute; color: white; font-size: 14px; top: -2px; left: 2px; }
    .task-content { flex: 1; }
    .task-text { font-size: 15px; color: #1a1a1a; margin-bottom: 4px; }
    .task-meta { font-size: 12px; color: #6b7280; }
    .task-overdue { border-left: 3px solid #dc2626; }
    .badge { display: inline-block; padding: 2px 8px; border-radius: 10px; font-size: 11px; font-weight: 500; background: #fee2e2; color: #991b1b; margin-left: 8px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>✅ Task Manager</h1>

    <div class="stats">
      <div class="stat-card">
        <div class="stat-label">Total Tasks</div>
        <div class="stat-value">${tasks.length}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Incomplete</div>
        <div class="stat-value" style="color: #3b82f6;">${incompleteTasks.length}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Completed</div>
        <div class="stat-value" style="color: #059669;">${completedTasks.length}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Overdue</div>
        <div class="stat-value" style="color: #dc2626;">${overdueTasks.length}</div>
      </div>
    </div>

    ${overdueTasks.length > 0 ? `
    <div class="section">
      <div class="section-title">🚨 Overdue Tasks</div>
      ${overdueTasks.map(task => `
        <div class="task task-overdue">
          <div class="checkbox"></div>
          <div class="task-content">
            <div class="task-text">${task.text}</div>
            <div class="task-meta">
              ${task.assigned_to_name ? `Assigned to ${task.assigned_to_name}` : 'Unassigned'}
              ${task.date ? ` • Due ${new Date(task.date).toLocaleDateString()}` : ''}
              ${task.lead_name ? ` • Lead: ${task.lead_name}` : ''}
            </div>
          </div>
        </div>
      `).join('')}
    </div>
    ` : ''}

    <div class="section">
      <div class="section-title">📝 Incomplete Tasks</div>
      ${incompleteTasks.filter(t => !overdueTasks.includes(t)).length > 0 ? incompleteTasks.filter(t => !overdueTasks.includes(t)).map(task => `
        <div class="task">
          <div class="checkbox"></div>
          <div class="task-content">
            <div class="task-text">${task.text}</div>
            <div class="task-meta">
              ${task.assigned_to_name ? `Assigned to ${task.assigned_to_name}` : 'Unassigned'}
              ${task.date ? ` • Due ${new Date(task.date).toLocaleDateString()}` : ''}
              ${task.lead_name ? ` • Lead: ${task.lead_name}` : ''}
            </div>
          </div>
        </div>
      `).join('') : '<p style="color: #6b7280;">No incomplete tasks</p>'}
    </div>

    ${completedTasks.length > 0 ? `
    <div class="section">
      <div class="section-title">✅ Completed Tasks</div>
      ${completedTasks.slice(0, 20).map(task => `
        <div class="task" style="opacity: 0.6;">
          <div class="checkbox checked"></div>
          <div class="task-content">
            <div class="task-text" style="text-decoration: line-through;">${task.text}</div>
            <div class="task-meta">
              ${task.assigned_to_name ? `Assigned to ${task.assigned_to_name}` : 'Unassigned'}
              ${task.lead_name ? ` • Lead: ${task.lead_name}` : ''}
            </div>
          </div>
        </div>
      `).join('')}
    </div>
    ` : ''}
  </div>
</body>
</html>
  `.trim();
}
