import { useMutation } from "@tanstack/react-query"

export const useCloudinary = () => {
    return useMutation({
        mutationKey: ['uploadToCloudinary'],
        mutationFn: uploadToCloudinary
    })
}

const uploadToCloudinary = async (file: string) => {
    const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: file }),
    })
    const data = await response.json()
    console.log(data);
    return data.secure_url
}
