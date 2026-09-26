import { useQuery } from "@tanstack/react-query";
import { fetchSeasons } from "../api";

export function useSeasons(leagueId: string) {
    return useQuery({
        queryKey: ["seasons", leagueId],
        queryFn: () => fetchSeasons(leagueId)
    })
}