import { useState, useMemo } from "react"
import { PageHeader } from '@lucapimentel/velvet'
import { ALL_SPORTS, getAllSportsByLeague } from "./filterLeagues";
import { useDebouncedValue } from "./hooks/useDebouncedValue";
import { useLeagues } from "./hooks/useLeagues";
import { LeagueFilters } from "./components/LeagueFilters/LeagueFilters";
import "./index.css"
import { LeagueList } from "./components/LeagueList/LeagueList";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSport, setCurrentSport] = useState(ALL_SPORTS);

  const debouncedSearchTerm = useDebouncedValue(searchTerm, 300);

  const { data: leagues = [] } = useLeagues();

  const sports = useMemo(() => {
    return getAllSportsByLeague(leagues);
  }, [leagues]);

  console.log({ sports, leagues })

  return (
    <main className="page">
      <PageHeader title="Sports Leagues" />
      <LeagueFilters
        searchTerm={debouncedSearchTerm ?? ""}
        onSearchTextChange={setSearchTerm}
        allSports={sports}
        onSportChange={setCurrentSport}
        currentSportSelected={currentSport} />
      <LeagueList searchTerm={debouncedSearchTerm ?? ""} sport={currentSport} />
    </main>
  )
}

export default App
