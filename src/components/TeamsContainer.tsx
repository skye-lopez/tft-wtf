import {
    Flex,
    Text,
    Select,
    Code,
    Button,
} from "@chakra-ui/react";
import { TeamData, Team, Augment } from "../types/TeamData";
import { UnitMap } from "../App";
import Augments from "./Augments";

import {
    useState,
    useEffect,
} from "react";
import TopTeams from "./TopTeams";
import TeamBuilder from "./TeamBuilder";
import Units from "./Units";

interface TeamsContainerProps {
    teamData: TeamData
    unitMap: UnitMap
    selectedGroup: string
}

export default function TeamsContainer({ teamData, unitMap, selectedGroup }: TeamsContainerProps) {
    const [filteredTeamData, setFilteredTeamData] = useState<Team[]>([]);
    // sample, avg, top4%
    const [filters, setFilters] = useState<number[]>([0, 5, 40]);
    function updateFilter(e: any, idx: number) {
        setFilters((old: number[]) => {
            const n = [...old];
            n[idx] = parseInt(e.target.value);
            return n;
        });
    }

    useEffect(() => {
        setFilteredTeamData(() => {
            const filteredData = teamData.teams.filter((team) => {
                const sample = filters[0] === 0 ? true : team.sample >= filters[0];
                const avg = filters[1] === 0 ? true : team.avg <= filters[1];
                const top4 = filters[2] === 0 ? true : team.top4 >= filters[2];

                return sample && avg && top4;
            })
            return filteredData;
        });
    }, [filters]);

    return (
        <Flex
            flexDir="column"
            alignItems="center"
            width="100%"
        >
            {
                selectedGroup === "teams" ? (<TopTeams updateFilter={updateFilter} filteredTeamData={filteredTeamData} unitMap={unitMap} />)
                    : selectedGroup === "augments" ? (<Augments augmentData={teamData.augments} />)
                        : selectedGroup === "builder" ? (<TeamBuilder unitMap={unitMap} />)
                            : selectedGroup === "units" ? (<Units units={teamData.units} />)
                                : null
            }
            {/* Filtering */}



        </Flex>
    );
}
