import {
    Flex,
    Text,
    Select,
    Code,
    Button,
} from "@chakra-ui/react";
import { TeamData, Team } from "../types/TeamData";
import { UnitMap } from "../App";

import DataInfoBanner from "./DataInfoBanner";
import TeamInfo from "./TeamInfo";

import {
    useState,
    useEffect,
} from "react";
import TopTeams from "./TopTeams";

interface TeamsContainerProps {
    teamData: TeamData
    unitMap: UnitMap
    selectedGroup: string
}

export default function TeamsContainer({ teamData, unitMap, selectedGroup }: TeamsContainerProps) {
    const [filteredTeamData, setFilteredTeamData] = useState<Team[]>([]);
    // sample, avg, top4%
    const [filters, setFilters] = useState<number[]>([100, 5, 40]);
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
        >
            {
                selectedGroup === "teams" ? (<TopTeams updateFilter={updateFilter} filteredTeamData={filteredTeamData} unitMap={unitMap} />)
                    : null
            }
            {/* Filtering */}



        </Flex>
    );
}
