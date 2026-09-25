import { describe, expect, it } from "vitest";
import type { League } from "./api";
import { ALL_SPORTS, filterLeagues, getAllSportsByLeague } from "./filterLeagues";

describe("filterLeague", () => {
    it("searching league per alt name should return that league", () => {
        const leagues: League[] = [
            { idLeague: "4328", strLeague: "English Premier League", strSport: "Soccer", strLeagueAlternate: "EPL" },
            { idLeague: "4331", strLeague: "German Bundesliga", strSport: "Soccer" },
        ]

        const result = filterLeagues(leagues, "   epl ", ALL_SPORTS);

        expect(result).toEqual([leagues[0]]);
    });

    it("filter league should return the correct sport and search term", () => {
        const leagues: League[] = [
            { idLeague: "4328", strLeague: "English Premier League", strSport: "Soccer", strLeagueAlternate: "EPL" },
            { idLeague: "4331", strLeague: "American Premier League", strSport: "Basketball" },
            { idLeague: "4332", strLeague: "German Bundesliga", strSport: "Soccer" },
        ]

        const result = filterLeagues(leagues, "premier", "Soccer");

        expect(result).toEqual([leagues[0]]);
    });

    it("getAllSportsByLeague should return unique and sorted sports", () => {
        const leagues: League[] = [
            { idLeague: "4328", strLeague: "English Premier League", strSport: "Soccer", strLeagueAlternate: "EPL" },
            { idLeague: "4331", strLeague: "American Premier League", strSport: "Basketball" },
            { idLeague: "4332", strLeague: "German Bundesliga", strSport: "Soccer" },
        ]

        const result = getAllSportsByLeague(leagues);

        expect(result).toEqual(["Basketball", "Soccer"]);
    });
})