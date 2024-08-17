import {
    Flex,
    Text,
    Select,
    Code,
    Button,
} from "@chakra-ui/react";
import {
    ChevronDownIcon
} from "@chakra-ui/icons";
import { Team } from "../types/TeamData";
import TeamInfo from "./TeamInfo";
import { UnitMap } from "../App";

interface TopTeamsProps {
    updateFilter: Function
    filteredTeamData: Team[]
    unitMap: UnitMap
}

export default function TopTeams({ updateFilter, filteredTeamData, unitMap }: TopTeamsProps) {
    return (
        <Flex
            direction="column"
        >
            <Flex
                width="100%"
                justifyContent="center"
            >
                <Flex
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Code
                        background="purple.100"
                        padding="10px"
                        margin="10px 10px"
                        textAlign={"center"}
                        borderRadius="10px"
                        as="b"
                        width="fit-content"
                    >
                        Sorted by Avg. Data filters below. Click any unit to get its best items.
                    </Code>
                    <Code
                        background="red.100"
                        padding="10px"
                        margin="10px 10px"
                        textAlign={"center"}
                        borderRadius="10px"
                        as="b"
                        width="fit-content"
                    >
                        Patch 14.16 is new! Make sure to account for sample sizes.
                    </Code>
                </Flex>
            </Flex>
            {/* FILTER */}
            <Flex
                direction="column"
                alignItems="center"
            >
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
                            <option value={500}>&#8805; 500</option>
                            <option value={100}>&#8805; 100</option>
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
            {/* DATA */}
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
