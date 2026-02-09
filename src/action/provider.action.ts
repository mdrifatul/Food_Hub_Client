"use server";

import { providerService } from "@/services/provider.service";
import { userService } from "@/services/user.service";
import { revalidatePath } from "next/cache";

export const createProvider = async (data: {
  businessName: string;
  businessAddress: string;
  businessPhone: string;
  description?: string;
  authorId: string;
}) => {
  const { ...providerData } = data;
  const providerPayload = { ...providerData };
  const res = await providerService.createProvider(providerPayload);

  if (res.data && !res.error) {
    const roleUpdateRes = await userService.updateUserRole(
      data.authorId,
      "PROVIDER",
    );

    if (roleUpdateRes.error) {
      console.error("Role update failed:", roleUpdateRes.error);
      return {
        data: null,
        error: {
          message:
            "Provider created but failed to update user role: " +
            roleUpdateRes.error.message,
        },
      };
    }
  }

  revalidatePath("/provider-dashboard");
  revalidatePath("/providerForm");

  return res;
};
