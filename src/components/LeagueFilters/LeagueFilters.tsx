import { ALL_SPORTS } from "../../filterLeagues"
import { Field, Input, Select } from "@lucapimentel/velvet"
import styles from "./LeagueFilters.module.css"


interface ILeagueFiltersProps {
    searchTerm: string,
    currentSportSelected: string,
    allSports: string[],
    onSearchTextChange: (value: string) => void,
    onSportChange: ((value: string) => void)
}

export function LeagueFilters({ searchTerm, currentSportSelected, allSports, onSearchTextChange, onSportChange }: ILeagueFiltersProps) {
    const sportItems = [{ value: ALL_SPORTS, label: "All sports" }, ...allSports.map(sport => ({ value: sport, label: sport }))]

    return (
        <div className={styles.filters}>
            <Field label="Search Leagues">
                {(control) =>
                    <Input {...control} type="search" value={searchTerm} onChange={(event) => onSearchTextChange(event.target.value)} />
                }
            </Field>
            <Field label="Sport">
                {(control) =>
                    <Select {...control} items={sportItems} value={currentSportSelected} onValueChange={onSportChange} />
                }
            </Field>
        </div>
    )
}