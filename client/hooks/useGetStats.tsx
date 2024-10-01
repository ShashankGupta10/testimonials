import { useQuery } from "@tanstack/react-query"

export const useGetStats = () => {
    return useQuery({
        queryKey: ["stats"],
        queryFn: getStats
    })
}

const getStats = async () => {
    const response = await fetch("http://localhost:5000/api/v1/user/stats", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    })
    const data = await response.json()
    return data.data
}