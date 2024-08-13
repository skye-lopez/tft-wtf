import {
    Flex,
    Text,
    Select,
    Code,
} from "@chakra-ui/react";
import {
    ChevronDownIcon
} from "@chakra-ui/icons";
import { TeamData, Team } from "../types/TeamData";
import { UnitMap } from "../App";

import DataInfoBanner from "./DataInfoBanner";
import TeamInfo from "./TeamInfo";

import {
    useState,
    useEffect,
} from "react";

interface TeamsContainerProps {
    teamData: TeamData
    unitMap: UnitMap
}

export default function TeamsContainer({ teamData, unitMap }: TeamsContainerProps) {
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
            {/* Filtering */}
            <Flex
                direction="column"
                alignItems="center"
                marginTop="10px"
            >

                <Code
                    padding="5px"
                    margin="5px"
                    borderRadius="10px"
                    background="green.100"
                >
                    High elo team and unit data. No guide's, just data, and the ability to filter. GLHF :)
                </Code>
                <Text
                    as="b"
                    fontSize="2xl"
                >
                    Filters
                </Text>
                <Flex
                    wrap="wrap"
                >
                    <Flex
                        alignItems="center"
                        margin="10px"
                    >
                        <Text
                            background="purple.300"
                            padding="10px"
                            borderLeftRadius="10px"
                            color="white"
                            as="b"
                        >
                            Sample:
                        </Text>
                        <Select
                            icon={<ChevronDownIcon />}
                            background="white"
                            height="45px"
                            borderLeftRadius="0px"
                            border="2px solid purple.300"
                            onChange={(e) => updateFilter(e, 0)}
                        >
                            <option value={100}>&#8805; 100</option>
                            <option value={500}>&#8805; 500</option>
                            <option value={1000}>&#8805; 1000</option>
                            <option value={2000}>&#8805; 2000</option>
                            <option value={0}>Any</option>
                        </Select>
                    </Flex>
                    <Flex
                        alignItems="center"
                        margin="10px"
                    >
                        <Text
                            background="purple.300"
                            padding="10px"
                            borderLeftRadius="10px"
                            color="white"
                            as="b"
                        >
                            Avg:
                        </Text>
                        <Select
                            icon={<ChevronDownIcon />}
                            background="white"
                            height="45px"
                            borderLeftRadius="0px"
                            border="2px solid purple.300"
                            onChange={(e) => updateFilter(e, 1)}
                        >
                            <option value={5}>&#8804; 5</option>
                            <option value={4.5}>&#8804; 4.5</option>
                            <option value={4}>&#8804; 4</option>
                            <option value={3.5}>&#8804; 3.5</option>
                            <option value={3}>&#8804; 3</option>
                            <option value={2.5}>&#8804; 2.5</option>
                            <option value={0}>Any</option>
                        </Select>
                    </Flex>
                    <Flex
                        alignItems="center"
                        margin="10px"
                    >
                        <Text
                            background="purple.300"
                            padding="10px"
                            borderLeftRadius="10px"
                            color="white"
                            as="b"
                        >
                            Top4%
                        </Text>
                        <Select
                            icon={<ChevronDownIcon />}
                            background="white"
                            height="45px"
                            borderLeftRadius="0px"
                            border="2px solid purple.300"
                            onChange={(e) => updateFilter(e, 2)}
                        >
                            <option value={40}>&#8805; 40%</option>
                            <option value={50}>&#8805; 50%</option>
                            <option value={60}>&#8805; 60%</option>
                            <option value={70}>&#8805; 70%</option>
                            <option value={80}>&#8805; 80%</option>
                            <option value={0}>Any %</option>
                        </Select>
                    </Flex>
                </Flex>
            </Flex>

            <Code
                background="purple.100"
                padding="10px"
                margin="10px"
            >
                Click any unit to get its best items! Augment data coming soon.
            </Code>

            <Flex
                flexDir="column"
            >
                {filteredTeamData?.map((t: Team, i: number) => (
                    <TeamInfo
                        key={i}
                        team={t}
                        unitMap={unitMap}
                    />
                ))}
            </Flex>
        </Flex>
    );
}
