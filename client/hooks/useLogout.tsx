import { BACKEND_URL } from "@/constants/hero"
import { useMutation } from "@tanstack/react-query"

export const useLogout = () => {
    return useMutation({
        mutationKey: ['logout'],
        mutationFn: logout,
    })
}

const logout = async () => {
    const response = await fetch(`${BACKEND_URL}/api/v1/auth/logout`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    })
    const data: {
        data: {
            success: boolean
            message: string
        }
    } = await response.json()
    return data.data.success
}