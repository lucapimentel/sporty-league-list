import { Button, Spinner } from "@lucapimentel/velvet";
import styles from "./SeasonList.module.css"
import { useSeasons } from "../../hooks/useSeasons";

interface ISeasonListProps {
    leagueId: string;
    leagueName: string;
}

export function SeasonList({ leagueId, leagueName }: ISeasonListProps) {
    const { data: seasons, isPending, isError, refetch } = useSeasons(leagueId);

    if (isPending) {
        return <Spinner label="Loading seasons" />
    }

    if (isError) {
        return <p>Couldn't load seasons <Button size="sm" onClick={() => refetch()}>Retry</Button></p>
    }

    if (seasons.length === 0) {
        return <p>No seasons available for this league</p>
    }

    return (
        <ul className={styles.seasons}>
            {seasons.map((season) => {
                return (
                    <li key={season.strSeason}>
                        {
                            season.strBadge ?
                                <img src={season.strBadge} alt={`${leagueName} ${season.strSeason} badge`}
                                    width={72} height={72} loading="lazy" /> :
                                <div className={styles.placeholder}>No badge</div>
                        }
                        <span>{season.strSeason}</span>
                    </li>
                )
            })}
        </ ul>
    )
}