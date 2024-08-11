import {
    useState,
    useEffect,
} from "react";
import {
    ChakraProvider,
    Flex,
} from "@chakra-ui/react"
import axios from "axios";

import {
    get,
    set,
} from "./utils/localStorage";

import {
    TeamData,
    Team,
    Augment,
    Unit,
} from "./types/TeamData";

import theme from "./styles/theme";
import Header from "./components/Header";
import LoadingState from "./components/LoadingState";
import TeamsContainer from "./components/TeamsContainer";

export default function App() {
    const [loading, setLoading] = useState<boolean>(true);
    const [teamData, setTeamData] = useState<TeamData>();

    // Mount team data on load, cache for 24hrs
    useEffect(() => {
        async function loadTeamData() {
            let teamData = get("teamData");
            if (!teamData) {
                teamData = (await axios.get("https://tft-wtf-static.s3.us-west-1.amazonaws.com/data.json")).data;
                teamData?.teams.sort((a: Team, b: Team) => a.avg - b.avg);
                teamData?.augments.sort((a: Augment, b: Augment) => a.avg - b.avg)
                teamData?.units.sort((a: Unit, b: Unit) => a.avg - b.avg)
                set("teamData", teamData, { expires: true, expireType: "days", expireLength: 1 });
            }
            setTeamData(teamData);
        }

        loadTeamData();
    }, []);

    useEffect(() => {
        if (teamData?.teams) {
            setLoading(false);
        }
    }, [teamData])

    return (
        <ChakraProvider theme={theme}>
            {/* Global container */}
            <Flex
                display="flex"
                alignItems="center"
                justifyContent="center"
                w="100%"
                h="100%"
            >
                {/* Content container */}
                <Flex
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                    width="100%"
                    maxWidth="1400px"
                >
                    <Header />
                    {teamData && !loading ? (<>
                        <TeamsContainer
                            teamData={teamData}
                        />
                    </>) : (<LoadingState />)}
                </Flex>
            </Flex>
        </ChakraProvider>
    );
}
