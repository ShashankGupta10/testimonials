import { useMutation } from "@tanstack/react-query"

export const useCloudinary = () => {
    return useMutation({
        mutationKey: ['uploadToCloudinary'],
        mutationFn: uploadToCloudinary
    })
}

const uploadToCloudinary = async (file: string) => {
    const response = await fetch('https://testimonials-s796.onrender.com/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: file }),
    })
    const data = await response.json()
    console.log(data);
    return data.secure_url
}
