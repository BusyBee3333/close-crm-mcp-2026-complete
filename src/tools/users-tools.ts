// User and role management tools

import type { CloseClient } from "../client/close-client.js";
import type { User, Role } from "../types/index.js";

export function registerUsersTools(server: any, client: CloseClient) {
  // List users
  server.tool(
    "close_list_users",
    "List all users in the organization",
    {},
    async () => {
      const users = await client.get<{ data: User[] }>("/user/");
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(users, null, 2),
          },
        ],
      };
    }
  );

  // Get user
  server.tool(
    "close_get_user",
    "Get a specific user by ID",
    {
      user_id: {
        type: "string",
        description: "User ID",
        required: true,
      },
    },
    async (args: any) => {
      const user = await client.get<User>(`/user/${args.user_id}/`);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(user, null, 2),
          },
        ],
      };
    }
  );

  // Get current user
  server.tool(
    "close_get_current_user",
    "Get the current authenticated user",
    {},
    async () => {
      const user = await client.get<User>("/me/");
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(user, null, 2),
          },
        ],
      };
    }
  );

  // List roles
  server.tool(
    "close_list_roles",
    "List all roles in the organization",
    {},
    async () => {
      const roles = await client.get<{ data: Role[] }>("/role/");
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(roles, null, 2),
          },
        ],
      };
    }
  );
}
