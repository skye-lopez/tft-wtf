import {
    Flex,
    Text,
} from "@chakra-ui/react";
import TeamData from "../types/TeamData";

import TeamsContainerInfo from "./TeamsContainerInfo";

interface TeamsContainerProps {
    teamData: TeamData
}

export default function TeamsContainer({ teamData }: TeamsContainerProps) {
    return (
        <Flex>
            {/* INFO BANNER */}
            <TeamsContainerInfo
                sample={teamData.sample}
            />
        </Flex>
    );
}
