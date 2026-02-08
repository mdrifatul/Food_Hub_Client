"use server"

import { userService } from "@/services/user.service"
import { revalidatePath } from "next/cache"

export const getAllUser = async () => {
    const res = await userService.getAllUser()
    console.log(res)
    return res
}

export const updateUserStatus = async (userId: string, status: string) => {
    const res = await userService.updateUserStatus(userId, status)
    revalidatePath("/admin-dashboard/allusers")
    return res
} 