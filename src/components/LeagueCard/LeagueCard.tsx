import type { League } from "../../api";
import { Card, Badge } from "@lucapimentel/velvet";
import styles from "./LeagueCard.module.css"
import { SeasonList } from "../SeasonList/SeasonList";

interface ILeagueCardProps {
    league: League;
    isSelected: boolean;
    onToggle: () => void;
}

export function LeagueCard({ league, isSelected, onToggle }: ILeagueCardProps) {
    return (
        <Card>
            <button type="button" aria-expanded={isSelected} onClick={onToggle} className={styles.header}>
                <span className={styles.name}>{league.strLeague}</span>
                <span className={styles.alternateName}>{league.strLeagueAlternate || ""}</span>
                <Badge>{league.strSport}</Badge>
            </button>
            {isSelected && <SeasonList leagueId={league.idLeague} leagueName={league.strLeague} />}
        </Card>
    )
}