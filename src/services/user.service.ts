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
      console.log(err);
      return { data: null, err: { message: "something went wrong" } };
    }
  },
};
