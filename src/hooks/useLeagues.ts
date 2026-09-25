import { useQuery } from "@tanstack/react-query";
import { fetchLeagues } from "../api";

export function useLeagues() {
    return useQuery({
        queryKey: ["league"],
        queryFn: fetchLeagues
    })
}