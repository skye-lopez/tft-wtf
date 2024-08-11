import {
    Flex,
    Text,
    Code,
} from "@chakra-ui/react";

import {
    formatAvg,
    formatPercent,
} from "../utils/stringFormatter";

import { Team } from "../types/TeamData";
import TeamUnit from "./TeamUnit";

interface TeamProps {
    team: Team
}

export default function TeamInfo({ team }: TeamProps) {
    return (
        <Flex
            background="white"
            margin="10px"
            borderRadius="10px"
            padding="10px 15px"
            flexWrap="wrap"
        >
            {/* Units */}
            <Flex
                justifyContent="flex-start"
                width="100%"
                flexWrap="wrap"
            >
                {team?.unit_ids.map((unit, i) => <TeamUnit unit={unit} key={i} />)}
            </Flex>
            {/* Stats */}
            <Flex
                width="100%"
            >
                {/*Avg*/}
                <Flex>
                    <Code
                        margin="2px"
                        padding="5px 10px"
                        borderRadius="10px"
                        background={
                            team.avg > 5 ? "red.100"
                                : team.avg > 4.2 ? "orange.100"
                                    : "green.100"
                        }
                    >
                        Avg: {formatAvg(team.avg)}
                    </Code>

                    <Code
                        margin="2px"
                        padding="5px 10px"
                        borderRadius="10px"
                        background={
                            team.top4 < 41 ? "red.100"
                                : team.top4 < 49 ? "orange.100"
                                    : "green.100"
                        }
                    >
                        Top 4: {formatPercent(team.top4)}
                    </Code>

                    <Code
                        margin="2px"
                        padding="5px 10px"
                        borderRadius="10px"
                        background={
                            team.top3 < 20 ? "red.100"
                                : team.top3 < 30 ? "orange.100"
                                    : "green.100"
                        }
                    >
                        Top 3: {formatPercent(team.top3)}
                    </Code>

                    <Code
                        margin="2px"
                        padding="5px 10px"
                        borderRadius="10px"
                        background={
                            team.top2 < 15 ? "red.100"
                                : team.top2 < 20 ? "orange.100"
                                    : "green.100"
                        }
                    >
                        Top 2: {formatPercent(team.top2)}
                    </Code>

                    <Code
                        margin="2px"
                        padding="5px 10px"
                        borderRadius="10px"
                        background={
                            team.top1 < 5 ? "red.100"
                                : team.top1 < 10 ? "orange.100"
                                    : "green.100"
                        }
                    >
                        Top 1: {formatPercent(team.top1)}
                    </Code>
                </Flex>
            </Flex>
        </Flex>
    );
}
