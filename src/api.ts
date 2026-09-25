const API_BASE_URL = "https://www.thesportsdb.com/api/v1/json/3";

export type League = {
    idLeague: string,
    strLeague: string,
    strSport: string,
    strLeagueAlternate?: string | null,
}

export type Season = {
    strSeason: string,
    strBadge: string | null,
}

export type SeasonBadge = {
    season: string,
    badgeUrl: string
}

async function getJson<T>(path: string) {
    const response = await fetch(API_BASE_URL + path);

    if (!response.ok) {
        throw new Error(`TheSportsDB ${response.status}`);
    }

    return response.json() as T;
}

export async function fetchLeagues() {
    const body = await getJson<{ leagues: League[] | null }>("/all_leagues.php");
    return body.leagues ?? []
}

export async function fetchSeasons(leagueId: string) {
    const body = await getJson<{ seasons: Season[] | null }>(`/search_all_seasons.php?badge=1&id=${leagueId}`);
    return body.seasons ?? []
}



