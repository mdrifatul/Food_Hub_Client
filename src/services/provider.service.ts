import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const providerService = {
  createProvider: async function (providerData: {
    businessName: string;
    businessAddress: string;
    businessPhone: string;
    description?: string;
    authorId: string;
  }) {
    try {
      const cookiesStore = await cookies();
      const res = await fetch(`${API_URL}/providers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookiesStore.toString(),
        },
        body: JSON.stringify(providerData),
        cache: "no-store",
      });

      if (!res.ok) {
        return { data: null, error: { message: "Failed to create provider" } };
      }

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "something went wrong" } };
    }
  },
};
