import { useQuery } from "@tanstack/react-query";
import { fetchLeagues } from "../api";

export function useLeague() {
    return useQuery({
        queryKey: ["league"],
        queryFn: fetchLeagues
    })
}