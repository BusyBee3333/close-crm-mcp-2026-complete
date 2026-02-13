// Reporting and analytics tools

import type { CloseClient } from "../client/close-client.js";

export function registerReportingTools(server: any, client: CloseClient) {
  // Lead status changes report
  server.tool(
    "close_report_lead_status_changes",
    "Get report of lead status changes over time",
    {
      date_start: {
        type: "string",
        description: "Start date (YYYY-MM-DD)",
        required: false,
      },
      date_end: {
        type: "string",
        description: "End date (YYYY-MM-DD)",
        required: false,
      },
      status_id: {
        type: "string",
        description: "Filter by status ID",
        required: false,
      },
    },
    async (args: any) => {
      const params: any = {};
      if (args.date_start) params.date_start = args.date_start;
      if (args.date_end) params.date_end = args.date_end;
      if (args.status_id) params.status_id = args.status_id;

      const report = await client.get("/report/lead_status_changes/", params);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(report, null, 2),
          },
        ],
      };
    }
  );

  // Opportunity funnel report
  server.tool(
    "close_report_opportunity_funnel",
    "Get opportunity funnel/pipeline analytics",
    {
      date_start: {
        type: "string",
        description: "Start date (YYYY-MM-DD)",
        required: false,
      },
      date_end: {
        type: "string",
        description: "End date (YYYY-MM-DD)",
        required: false,
      },
      pipeline_id: {
        type: "string",
        description: "Filter by pipeline ID",
        required: false,
      },
      user_id: {
        type: "string",
        description: "Filter by user ID",
        required: false,
      },
    },
    async (args: any) => {
      const params: any = {};
      if (args.date_start) params.date_start = args.date_start;
      if (args.date_end) params.date_end = args.date_end;
      if (args.pipeline_id) params.pipeline_id = args.pipeline_id;
      if (args.user_id) params.user_id = args.user_id;

      const report = await client.get("/report/opportunity/", params);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(report, null, 2),
          },
        ],
      };
    }
  );

  // Activity overview report
  server.tool(
    "close_report_activity_overview",
    "Get activity summary and metrics",
    {
      date_start: {
        type: "string",
        description: "Start date (YYYY-MM-DD)",
        required: false,
      },
      date_end: {
        type: "string",
        description: "End date (YYYY-MM-DD)",
        required: false,
      },
      user_id: {
        type: "string",
        description: "Filter by user ID",
        required: false,
      },
      activity_type: {
        type: "string",
        description: "Filter by activity type",
        required: false,
      },
    },
    async (args: any) => {
      const params: any = {};
      if (args.date_start) params.date_start = args.date_start;
      if (args.date_end) params.date_end = args.date_end;
      if (args.user_id) params.user_id = args.user_id;
      if (args.activity_type) params.activity_type = args.activity_type;

      const report = await client.get("/report/activity/", params);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(report, null, 2),
          },
        ],
      };
    }
  );

  // Revenue forecast report
  server.tool(
    "close_report_revenue_forecast",
    "Get revenue forecast based on opportunities",
    {
      date_start: {
        type: "string",
        description: "Start date (YYYY-MM-DD)",
        required: false,
      },
      date_end: {
        type: "string",
        description: "End date (YYYY-MM-DD)",
        required: false,
      },
      pipeline_id: {
        type: "string",
        description: "Filter by pipeline ID",
        required: false,
      },
      user_id: {
        type: "string",
        description: "Filter by user ID",
        required: false,
      },
    },
    async (args: any) => {
      const params: any = {};
      if (args.date_start) params.date_start = args.date_start;
      if (args.date_end) params.date_end = args.date_end;
      if (args.pipeline_id) params.pipeline_id = args.pipeline_id;
      if (args.user_id) params.user_id = args.user_id;

      const report = await client.get("/report/revenue/", params);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(report, null, 2),
          },
        ],
      };
    }
  );

  // Leaderboard report
  server.tool(
    "close_report_leaderboard",
    "Get user performance leaderboard",
    {
      date_start: {
        type: "string",
        description: "Start date (YYYY-MM-DD)",
        required: false,
      },
      date_end: {
        type: "string",
        description: "End date (YYYY-MM-DD)",
        required: false,
      },
      metric: {
        type: "string",
        description: "Metric to rank by (calls, emails, opportunities_won)",
        required: false,
      },
    },
    async (args: any) => {
      const params: any = {};
      if (args.date_start) params.date_start = args.date_start;
      if (args.date_end) params.date_end = args.date_end;
      if (args.metric) params.metric = args.metric;

      const report = await client.get("/report/leaderboard/", params);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(report, null, 2),
          },
        ],
      };
    }
  );

  // Custom report query
  server.tool(
    "close_report_custom",
    "Run a custom report query",
    {
      report_type: {
        type: "string",
        description: "Report type/endpoint",
        required: true,
      },
      params: {
        type: "string",
        description: "JSON object with report parameters",
        required: false,
      },
    },
    async (args: any) => {
      const params = args.params ? JSON.parse(args.params) : {};
      const report = await client.get(`/report/${args.report_type}/`, params);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(report, null, 2),
          },
        ],
      };
    }
  );
}
