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

import theme from "./styles/theme";
import Header from "./components/Header";

export default function App() {
    const [loading, setLoading] = useState<boolean>(true);
    const [teamData, setTeamData] = useState<any>({});

    // Mount team data on load
    // also cache for 24hrs to remove redundant requests.
    useEffect(() => {
        async function loadTeamData() {
            let teamData = get("teamData");
            if (!teamData) {
                teamData = (await axios.get("https://tft-wtf-static.s3.us-west-1.amazonaws.com/test.json")).data;
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
                    width="100%"
                    maxWidth="1000px"
                >
                    <Header />
                </Flex>
            </Flex>
        </ChakraProvider>
    );
}
