// Search Results MCP App

export function generateSearchResults(data: any) {
  const query = data.query || '';
  const results = data.results || [];
  const resultType = data.resultType || 'all';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Search Results</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f7fa; padding: 20px; }
    .container { max-width: 1200px; margin: 0 auto; }
    .search-header { background: white; padding: 24px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    h1 { font-size: 24px; color: #1a1a1a; margin-bottom: 12px; }
    .search-meta { color: #6b7280; font-size: 14px; }
    .query { font-weight: 600; color: #3b82f6; }
    .results-container { background: white; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .result { padding: 20px; border-bottom: 1px solid #e5e7eb; }
    .result:last-child { border-bottom: none; }
    .result:hover { background: #f9fafb; }
    .result-title { font-size: 18px; font-weight: 600; color: #1a1a1a; margin-bottom: 8px; }
    .result-desc { font-size: 14px; color: #6b7280; margin-bottom: 12px; line-height: 1.5; }
    .result-meta { display: flex; gap: 16px; font-size: 12px; color: #6b7280; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 500; background: #dbeafe; color: #1e40af; }
    .no-results { padding: 60px 20px; text-align: center; color: #6b7280; }
    .no-results-icon { font-size: 48px; margin-bottom: 16px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="search-header">
      <h1>Search Results</h1>
      <div class="search-meta">
        Found <strong>${results.length}</strong> results for <span class="query">"${query}"</span>
      </div>
    </div>

    <div class="results-container">
      ${results.length > 0 ? results.map((result: any) => `
        <div class="result">
          <div class="result-title">
            ${result.name || result.display_name || result.text || 'Untitled'}
            <span class="badge">${result._type || resultType}</span>
          </div>
          ${result.description ? `<div class="result-desc">${result.description}</div>` : ''}
          ${result.note ? `<div class="result-desc">${result.note}</div>` : ''}
          <div class="result-meta">
            ${result.id ? `<span>ID: ${result.id}</span>` : ''}
            ${result.status_label ? `<span>Status: ${result.status_label}</span>` : ''}
            ${result.date_created ? `<span>Created: ${new Date(result.date_created).toLocaleDateString()}</span>` : ''}
            ${result.contacts ? `<span>${result.contacts.length} contacts</span>` : ''}
            ${result.value ? `<span>$${result.value.toLocaleString()}</span>` : ''}
          </div>
        </div>
      `).join('') : `
        <div class="no-results">
          <div class="no-results-icon">🔍</div>
          <div style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">No results found</div>
          <div>Try adjusting your search query</div>
        </div>
      `}
    </div>
  </div>
</body>
</html>
  `.trim();
}
