import { BACKEND_URL } from "@/constants/hero"
import { useMutation } from "@tanstack/react-query"

export const useCloudinary = () => {
    return useMutation({
        mutationKey: ['uploadToCloudinary'],
        mutationFn: uploadToCloudinary
    })
}

const uploadToCloudinary = async (file: string) => {
    const response = await fetch(`${BACKEND_URL}/api/upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: file }),
    })
    const data = await response.json()
    return data.secure_url
}
