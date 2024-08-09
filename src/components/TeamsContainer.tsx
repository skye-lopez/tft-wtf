import {
    Flex,
    Text,
} from "@chakra-ui/react";
import { TeamData, Team } from "../types/TeamData";

import {
    useState,
    useEffect,
} from "react";

interface TeamsContainerProps {
    teamData: TeamData
}

export default function TeamsContainer({ teamData }: TeamsContainerProps) {
    const [loaded, setLoaded] = useState<Team[]>([])
    return (
        <Flex>
        </Flex>
    );
}
