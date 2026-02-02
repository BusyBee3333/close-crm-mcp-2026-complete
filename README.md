> **🚀 Don't want to self-host?** [Join the waitlist for our fully managed solution →](https://mcpengage.com/closecrm)
> 
> Zero setup. Zero maintenance. Just connect and automate.

---

# 🚀 Close CRM MCP Server — 2026 Complete Version

## 💡 What This Unlocks

**This MCP server gives AI direct access to your entire Close CRM workspace.** Instead of clicking through interfaces, you just *tell* it what you need — and Claude handles the rest.

Close CRM is a powerful sales CRM built for inside sales teams. This MCP server transforms Claude into your intelligent sales assistant with full pipeline visibility and control.

### 🎯 CRM Power Moves — Close Edition

Real workflows you can automate with natural language:

1. **📊 Pipeline Intelligence** — "Show me all deals stuck in demo stage for >14 days, sorted by value, and draft follow-up emails for the top 5"
   
2. **🎯 Lead Scoring & Routing** — "List all new leads from the last 48 hours without a follow-up task, create tasks for each, and assign them round-robin to the sales team"

3. **💰 Deal Tracking & Forecasting** — "Pull all opportunities closing this month, calculate total pipeline value by user, and flag deals with <50% confidence"

4. **✉️ Smart Outreach** — "Find all leads tagged 'enterprise' with no activity in 30 days, send personalized re-engagement emails, and log the activity"

5. **📈 Performance Analytics** — "Generate a report of all won deals this quarter, group by lead source, and identify which sources have the highest close rates"

### 🔗 The Real Power: Combining Tools

AI can chain multiple Close CRM operations together intelligently:

- Query leads → Filter by status → Bulk update → Send emails → Create follow-up tasks
- Search opportunities → Analyze pipeline → Generate forecast → Create activities → Notify team
- List contacts → Segment by custom fields → Tag strategically → Schedule calls → Track in dashboard

## 📦 What's Inside

**12 powerful API tools** covering core Close CRM sales operations:

- **Lead Management** — `list_leads`, `get_lead`, `create_lead`, `update_lead`
- **Opportunity/Deal Pipeline** — `list_opportunities`, `create_opportunity`
- **Activity Logging** — `create_activity` (calls, emails, meetings, notes, SMS)
- **Task Management** — `list_tasks`, `create_task`
- **Email** — `send_email` (track from CRM with templates)
- **Metadata** — `list_statuses` (lead/opp statuses), `list_users`

All with proper error handling, automatic authentication, and TypeScript types.

## 🚀 Quick Start

### Option 1: Claude Desktop (Local)

1. **Clone and build:**
   ```bash
   git clone https://github.com/BusyBee3333/Close-CRM-MCP-2026-Complete.git
   cd close-crm-mcp-2026-complete
   npm install
   npm run build
   ```

2. **Get your Close CRM API key:**
   - Log into Close → Settings → Integrations → API Keys
   - Click "Create a new API Key"
   - Copy your key (starts with `api_`)

3. **Configure Claude Desktop:**
   
   On macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   
   On Windows: `%APPDATA%\Claude\claude_desktop_config.json`

   ```json
   {
     "mcpServers": {
       "close": {
         "command": "node",
         "args": ["/ABSOLUTE/PATH/TO/close-crm-mcp-2026-complete/dist/index.js"],
         "env": {
           "CLOSE_API_KEY": "api_xxxxxxxxxxxxxxxx"
         }
       }
     }
   }
   ```

4. **Restart Claude Desktop** — The Close tools will appear in Claude's context

### Option 2: Deploy to Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/close-mcp)

1. Click the button above
2. Set `CLOSE_API_KEY` in Railway dashboard
3. Use the Railway URL as your MCP server endpoint

### Option 3: Docker

```bash
docker build -t close-mcp .
docker run -p 3000:3000 \
  -e CLOSE_API_KEY=api_xxxxxxxx \
  close-mcp
```

## 🔐 Authentication

Close CRM uses **API Key authentication** with HTTP Basic Auth.

**How to get your API key:**
1. Log into your Close account
2. Navigate to Settings → Integrations → API Keys
3. Click "Create a new API Key"
4. Name it (e.g., "Claude MCP Server")
5. Copy the key — it starts with `api_`

**Security:** Close API keys have full account access. Store them securely and never commit to version control.

**Documentation:** [Close API Reference](https://developer.close.com/)

The MCP server automatically handles authentication using HTTP Basic Auth (API key as username, empty password).

## 🎯 Example Prompts

Once connected to Claude, use natural language to control Close CRM:

### Lead Management
- *"Show me all leads created this week that don't have a status set"*
- *"Create a new lead for Acme Corp with contact Jane Doe (jane@acme.com)"*
- *"Update lead_abc123 to status 'Qualified' and add a note about our call"*
- *"List all leads where the company name contains 'Tech' and show me their latest activity"*

### Pipeline & Opportunities
- *"Show me all open opportunities worth more than $10k"*
- *"Create a $25,000 opportunity for lead_xyz789 in the 'Demo Scheduled' stage"*
- *"List all opportunities assigned to user_123 that are closing this month"*

### Activities & Follow-ups
- *"Log a call activity for lead_abc with notes: 'Great conversation, sending pricing'"*
- *"Create a follow-up task for lead_xyz due tomorrow: 'Send contract for review'"*
- *"Show me all incomplete tasks assigned to me"*

### Email & Outreach
- *"Send an email to contact_456 with subject 'Follow-up on Demo' and body text..."*
- *"Draft and send pricing emails to all leads in 'Pricing Sent' status from last week"*

### Insights & Reporting
- *"List all users in my Close organization with their roles"*
- *"Show me all available lead statuses and opportunity pipeline stages"*
- *"Generate a pipeline summary: count of opportunities by stage with total values"*

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn
- Close CRM account with API access

### Setup

```bash
git clone https://github.com/BusyBee3333/Close-CRM-MCP-2026-Complete.git
cd close-crm-mcp-2026-complete
npm install
cp .env.example .env
# Edit .env and add your CLOSE_API_KEY
npm run build
npm start
```

### Testing

```bash
npm test                  # Run all tests
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
```

### Project Structure

```
close-crm-mcp-2026-complete/
├── src/
│   └── index.ts          # Main server with 12 tool definitions
├── dist/                 # Compiled JavaScript
├── package.json
├── tsconfig.json
├── .env.example          # Template for environment variables
└── README.md             # This file
```

## 🐛 Troubleshooting

### "Authentication failed"
- Verify your API key starts with `api_` and is copied correctly
- Check that your API key hasn't been revoked in Close settings
- Ensure you have the necessary permissions (admin or API access enabled)

### "Tools not appearing in Claude"
- Restart Claude Desktop completely (Quit → Reopen)
- Verify the path in `claude_desktop_config.json` is absolute, not relative
- Check that `dist/index.js` exists after running `npm run build`
- Look at Claude Desktop logs: `tail -f ~/Library/Logs/Claude/mcp*.log` (macOS)

### "Rate limit exceeded"
- Close API has rate limits per endpoint (typically 100-600 req/min)
- Add delays between bulk operations
- Check [Close API rate limits](https://developer.close.com/#ratelimiting)

### "Invalid lead_id / contact_id"
- Close IDs are prefixed: `lead_`, `cont_`, `oppo_`, `acti_`, `task_`, `user_`
- Use `list_*` commands first to get valid IDs
- IDs are case-sensitive

## 📖 Resources

- **[Close API Documentation](https://developer.close.com/)** — Official API reference
- **[Close Help Center](https://help.close.com/)** — CRM best practices
- **[MCP Protocol Specification](https://modelcontextprotocol.io/)** — Learn about MCP
- **[Claude Desktop Documentation](https://claude.ai/desktop)** — Setup and usage

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-tool`)
3. Add tests for new tools
4. Commit your changes (`git commit -m 'Add amazing tool'`)
5. Push to the branch (`git push origin feature/amazing-tool`)
6. Open a Pull Request

### Ideas for Contributions
- Add webhooks support for real-time updates
- Implement bulk operations (bulk lead import, bulk update)
- Add custom field mapping helpers
- Create activity templates
- Build pipeline visualization tools

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

## 🙏 Credits

Built by [MCPEngage](https://mcpengage.com) — AI infrastructure for business software.

Want more MCP servers? Check out our [full catalog](https://mcpengage.com) covering 30+ business platforms including Pipedrive, HubSpot, Salesforce, and more.

---

**Questions?** Open an issue or join our [Discord community](https://discord.gg/mcpengine).
