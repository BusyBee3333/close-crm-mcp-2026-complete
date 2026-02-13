// Task management tools

import type { CloseClient } from "../client/close-client.js";
import type { Task } from "../types/index.js";

export function registerTasksTools(server: any, client: CloseClient) {
  // List tasks
  server.tool(
    "close_list_tasks",
    "List all tasks with optional filtering",
    {
      lead_id: {
        type: "string",
        description: "Filter by lead ID",
        required: false,
      },
      assigned_to: {
        type: "string",
        description: "Filter by assigned user ID",
        required: false,
      },
      is_complete: {
        type: "boolean",
        description: "Filter by completion status",
        required: false,
      },
      limit: {
        type: "number",
        description: "Number of results",
        required: false,
      },
    },
    async (args: any) => {
      const params: any = { limit: args.limit };
      if (args.lead_id) params.lead_id = args.lead_id;
      if (args.assigned_to) params.assigned_to = args.assigned_to;
      if (args.is_complete !== undefined)
        params.is_complete = args.is_complete;

      const tasks = await client.search<Task>("/task/", params);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(tasks, null, 2),
          },
        ],
      };
    }
  );

  // Get task
  server.tool(
    "close_get_task",
    "Get a specific task by ID",
    {
      task_id: {
        type: "string",
        description: "Task ID",
        required: true,
      },
    },
    async (args: any) => {
      const task = await client.get<Task>(`/task/${args.task_id}/`);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(task, null, 2),
          },
        ],
      };
    }
  );

  // Create task
  server.tool(
    "close_create_task",
    "Create a new task",
    {
      lead_id: {
        type: "string",
        description: "Lead ID",
        required: true,
      },
      text: {
        type: "string",
        description: "Task description",
        required: true,
      },
      assigned_to: {
        type: "string",
        description: "User ID to assign task to",
        required: false,
      },
      date: {
        type: "string",
        description: "Due date (YYYY-MM-DD format)",
        required: false,
      },
      type: {
        type: "string",
        description: "Task type (e.g., 'lead', 'inbox')",
        required: false,
      },
    },
    async (args: any) => {
      const body: any = {
        lead_id: args.lead_id,
        text: args.text,
        _type: args.type || "lead",
      };

      if (args.assigned_to) body.assigned_to = args.assigned_to;
      if (args.date) body.date = args.date;

      const task = await client.post<Task>("/task/", body);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(task, null, 2),
          },
        ],
      };
    }
  );

  // Update task
  server.tool(
    "close_update_task",
    "Update an existing task",
    {
      task_id: {
        type: "string",
        description: "Task ID",
        required: true,
      },
      text: {
        type: "string",
        description: "Task description",
        required: false,
      },
      assigned_to: {
        type: "string",
        description: "User ID to assign task to",
        required: false,
      },
      date: {
        type: "string",
        description: "Due date",
        required: false,
      },
      is_complete: {
        type: "boolean",
        description: "Completion status",
        required: false,
      },
    },
    async (args: any) => {
      const body: any = {};

      if (args.text) body.text = args.text;
      if (args.assigned_to) body.assigned_to = args.assigned_to;
      if (args.date) body.date = args.date;
      if (args.is_complete !== undefined)
        body.is_complete = args.is_complete;

      const task = await client.put<Task>(`/task/${args.task_id}/`, body);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(task, null, 2),
          },
        ],
      };
    }
  );

  // Delete task
  server.tool(
    "close_delete_task",
    "Delete a task",
    {
      task_id: {
        type: "string",
        description: "Task ID",
        required: true,
      },
    },
    async (args: any) => {
      await client.delete(`/task/${args.task_id}/`);
      return {
        content: [
          {
            type: "text",
            text: `Task ${args.task_id} deleted successfully`,
          },
        ],
      };
    }
  );

  // Complete task
  server.tool(
    "close_complete_task",
    "Mark a task as complete",
    {
      task_id: {
        type: "string",
        description: "Task ID",
        required: true,
      },
    },
    async (args: any) => {
      const task = await client.put<Task>(`/task/${args.task_id}/`, {
        is_complete: true,
      });
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(task, null, 2),
          },
        ],
      };
    }
  );
}
