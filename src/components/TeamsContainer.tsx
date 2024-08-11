import {
    Flex,
    Text,
} from "@chakra-ui/react";
import { TeamData } from "../types/TeamData";

import DataInfoBanner from "./DataInfoBanner";
import TeamInfo from "./TeamInfo";

import {
    useState,
    useEffect,
} from "react";

interface TeamsContainerProps {
    teamData: TeamData
}

export default function TeamsContainer({ teamData }: TeamsContainerProps) {
    return (
        <Flex
            flexDir="column"
            alignItems="center"
        >
            {/* TITLE */}
            <Text
                as="b"
                fontSize="xl"
                marginBottom="10px"
            >
                Top Teams
            </Text>

            <DataInfoBanner
                sample={teamData.sample}
            />

            <Flex
                flexDir="column"
            >
                {teamData?.teams?.map((t, i) => (
                    <TeamInfo
                        key={i}
                        team={t}
                    />
                ))}
            </Flex>
        </Flex>
    );
}
