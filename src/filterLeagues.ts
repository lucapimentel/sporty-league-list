import type { League } from "./api";

export const ALL_SPORTS = "all";

export function filterLeagues(leagues: League[], searchTerm: string, sport: string) {
    const query = searchTerm.trim().toLowerCase();
    const filteredLeagues = leagues.filter((league) => {
        if (sport !== ALL_SPORTS && league.strSport !== sport) {
            return false;
        }

        return league.strLeague.toLowerCase().includes(query) || league.strLeagueAlternate?.toLowerCase().includes(query);
    });

    return filteredLeagues;
}

export function getAllSportsByLeague(leagues: League[]) {
    const getAllSports = leagues.map((league) => league.strSport);
    const uniqueSports = new Set(getAllSports);

    return [...uniqueSports].sort();
}