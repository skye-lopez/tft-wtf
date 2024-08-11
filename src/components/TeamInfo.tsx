import {
    Flex,
    Text,
} from "@chakra-ui/react";

import { Team } from "../types/TeamData";

interface TeamProps {
    team: Team
}

export default function TeamInfo({ team }: TeamProps) {
    return (
        <Flex>
            <Text>
                {team.id}
            </Text>
        </Flex>
    );
}
