import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { League, Season } from "../../api";
import { ALL_SPORTS } from "../../filterLeagues";
import { LeagueList } from "./LeagueList";

const epl: League = { idLeague: "4328", strLeague: "English Premier League", strSport: "Soccer" };
const bundesliga: League = { idLeague: "4331", strLeague: "German Bundesliga", strSport: "Soccer" };

function jsonResponse(body: unknown) {
    return Promise.resolve(new Response(JSON.stringify(body)));
}

function stubFetch(seasons: Season[]) {
    const fetchMock = vi.fn((url: string) =>
        url.includes("all_leagues") ? jsonResponse({ leagues: [epl, bundesliga] }) : jsonResponse({ seasons }),
    );
    vi.stubGlobal("fetch", fetchMock);
    return fetchMock;
}

function renderLeagueList() {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { staleTime: Infinity, retry: false } },
    });

    return render(
        <QueryClientProvider client={queryClient}>
            <LeagueList searchTerm="" sport={ALL_SPORTS} />
        </QueryClientProvider>,
    );
}

afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
});

describe("LeagueList", () => {
    it("LeagueList_SelectDeselectReselect_FetchesSeasonsOnce", async () => {
        const fetchMock = stubFetch([{ strSeason: "1992-1993", strBadge: "https://x/epl.png" }]);
        const user = userEvent.setup();
        renderLeagueList();
        const eplButton = await screen.findByRole("button", { name: /English Premier League/ });

        await user.click(eplButton);
        await screen.findByAltText("English Premier League 1992-1993 badge");
        await user.click(eplButton);
        await user.click(eplButton);

        await screen.findByAltText("English Premier League 1992-1993 badge");
        const seasonCalls = fetchMock.mock.calls.filter(([url]) => url.includes("search_all_seasons"));
        expect(seasonCalls).toHaveLength(1);
    });

    it("LeagueList_SelectAnotherLeague_CollapsesThePreviousOne", async () => {
        stubFetch([{ strSeason: "1992-1993", strBadge: "https://x/epl.png" }]);
        const user = userEvent.setup();
        renderLeagueList();
        const eplButton = await screen.findByRole("button", { name: /English Premier League/ });
        const bundesligaButton = screen.getByRole("button", { name: /German Bundesliga/ });

        await user.click(eplButton);
        await user.click(bundesligaButton);

        expect(eplButton.getAttribute("aria-expanded")).toBe("false");
        expect(bundesligaButton.getAttribute("aria-expanded")).toBe("true");
    });

    it("LeagueList_SeasonWithoutBadge_ShowsPlaceholderNextToBadge", async () => {
        stubFetch([
            { strSeason: "1892-1893", strBadge: null },
            { strSeason: "1893-1894", strBadge: "https://x/b.png" },
        ]);
        const user = userEvent.setup();
        renderLeagueList();

        await user.click(await screen.findByRole("button", { name: /English Premier League/ }));

        await screen.findByText("No badge");
        const images = screen.getAllByRole("img");
        expect(images).toHaveLength(1);
        expect(images[0].getAttribute("alt")).toBe("English Premier League 1893-1894 badge");
        screen.getByText("1892-1893");
        screen.getByText("1893-1894");
    });
});