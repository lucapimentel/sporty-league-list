import { useMemo, useState } from "react";
import { useLeagues } from "../../hooks/useLeagues";
import { filterLeagues } from "../../filterLeagues";
import styles from "./LeagueList.module.css"
import { LeagueCard } from "../LeagueCard/LeagueCard";
import { Button, Card, EmptyState, Skeleton } from "@lucapimentel/velvet";

interface LeagueListProps {
    searchTerm: string;
    sport: string;
}

export function LeagueList({ searchTerm, sport }: LeagueListProps) {
    const { data: leagues = [], isPending, isError, refetch } = useLeagues();
    const [selectedLeagueId, setSelectedLeagueId] = useState<string | null>(null);

    const visibleLeagues = useMemo(() => {
        return filterLeagues(leagues, searchTerm, sport);
    }, [leagues, searchTerm, sport]);

    console.log({ visibleLeagues });

    if (isPending) {
        return Array.from({ length: 5 }).map((_, index) => {
            return (
                <Card key={index}>
                    <Skeleton height="3rem" />
                </Card>
            )
        })
    }

    if (isError) {
        return <EmptyState title="Couldn't load leagues" action={<Button onClick={() => refetch()}>Retry</Button>} />
    }

    if (visibleLeagues.length === 0) {
        return <EmptyState title="No leagues match your filters" />
    }

    return (
        <ul className={styles.grid}>
            {visibleLeagues.map((league) => {
                return (
                    <li key={league.idLeague}>
                        <LeagueCard league={league} isSelected={league.idLeague === selectedLeagueId} onToggle={() => setSelectedLeagueId((prevId) => {
                            if (prevId === league.idLeague) {
                                return null;
                            }

                            return league.idLeague;
                        })} />
                    </li>
                )
            })}
        </ul>
    )
}
