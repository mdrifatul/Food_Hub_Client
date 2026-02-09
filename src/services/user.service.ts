import { env } from "@/env";
import { cookies } from "next/headers";

export const userService = {
  getSession: async function () {
    try {
      const cookieStor = await cookies();
      const res = await fetch(`${env.AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieStor.toString(),
        },
        cache: "no-store",
      });

      const session = await res.json();
      if (session === null) {
        return { data: null, error: { message: "something went wrong" } };
      }
      return { data: session, error: null };
    } catch (err) {
      return { data: null, error: { message: "something went wrong" } };
    }
  },

  getAllUser: async function () {
    const cookieStor = await cookies();
    const res = await fetch(`${env.API_URL}/users`, {
      headers: {
        Cookie: cookieStor.toString(),
      },
      cache: "no-store",
    });

    const users = await res.json();
    return { data: users, error: null };
  },

  updateUserStatus: async function (id: string, status?: string) {
    try {
      const cookieStor = await cookies();
      const res = await fetch(`${env.API_URL}/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStor.toString(),
        },
        body: JSON.stringify({ status }),
        cache: "no-store",
      });

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to update user status" },
        };
      }

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "something went wrong" } };
    }
  },

  updateUserRole: async function (id: string, role?: string) {
    try {
      const cookieStor = await cookies();
      const res = await fetch(`${env.API_URL}/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStor.toString(),
        },
        body: JSON.stringify({ role }),
        cache: "no-store",
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("Update user role failed:", {
          status: res.status,
          statusText: res.statusText,
          error: errorData,
        });
        return {
          data: null,
          error: {
            message:
              errorData?.message ||
              `Failed to update user role (${res.status})`,
          },
        };
      }

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      console.error("Update user role error:", err);
      return {
        data: null,
        error: {
          message: err instanceof Error ? err.message : "Something went wrong",
        },
      };
    }
  },
};
