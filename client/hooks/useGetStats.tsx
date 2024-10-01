import { useQuery } from "@tanstack/react-query"

export const useGetStats = () => {
    return useQuery({
        queryKey: ["stats"],
        queryFn: getStats
    })
}

const getStats = async () => {
    const response = await fetch("https://testimonials-s796.onrender.com/api/v1/user/stats", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    })
    const data = await response.json()
    return data.data
}