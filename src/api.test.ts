import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchLeagues, fetchSeasons } from "./api";

afterEach(() => {
    vi.unstubAllGlobals();
});

describe("fetchSeasons", () => {
    it("fetchSeasons an unknown league returns empty array", async () => {
        vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ seasons: null }))));

        const seasons = await fetchSeasons("9999999999");
        expect(seasons).toEqual([]);
    })

    it("fetchSeasons if there is null badges keeps every season in order", async () => {
        vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ seasons: [{ strSeason: "1892-1893", strBadge: null }, { strSeason: "1893-1894", strBadge: "https://x/a.png" }] }))));

        const seasons = await fetchSeasons("4329");
        expect(seasons).toEqual([{ strSeason: "1892-1893", strBadge: null }, { strSeason: "1893-1894", strBadge: "https://x/a.png" }]);
    })

    it("fetchLeagues if server errors out it throws", async () => {
        vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("", { status: 500 })));

        const leagues = fetchLeagues();
        await expect(leagues).rejects.toThrow("TheSportsDB 500");
    })
})