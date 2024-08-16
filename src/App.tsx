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

export interface UnitMap {
    [key: string]: Unit
}

export default function App() {
    const [loading, setLoading] = useState<boolean>(true);
    const [teamData, setTeamData] = useState<TeamData>();
    const [unitMap, setUnitMap] = useState<UnitMap>({});
    const [selectedGroup, setSelectedGroup] = useState<string>("teams");

    function sortTeamData(teamData: TeamData): void {
        teamData?.teams.sort((a: Team, b: Team) => a.avg - b.avg);
        teamData?.augments.sort((a: Augment, b: Augment) => a.avg - b.avg)
        teamData?.units.sort((a: Unit, b: Unit) => a.avg - b.avg)
    }

    function getUnitMap(units: Unit[]): UnitMap {
        if (!units) return {};
        const unitMap: UnitMap = {};
        units.map((u: Unit) => {
            u.items.sort((a: any, b: any) => a.avg - b.avg);
            unitMap[u.id] = u;
        });
        return unitMap;
    }

    async function loadTeamData(cache: boolean, setUnitMap: Function, setTeamData: Function) {
        let teamData;
        if (cache) { teamData = get("teamData"); }
        if (!teamData) {
            teamData = (await axios.get("https://tft-wtf-static.s3.us-west-1.amazonaws.com/data.json")).data;
        }
        sortTeamData(teamData);
        const unitMap = getUnitMap(teamData?.units);

        if (cache) { set("teamData", teamData, { expires: true, expireType: "days", expireLength: 1 }); }
        setUnitMap(unitMap);
        setTeamData(teamData);
    }

    // Mount team data on load, cache for 24hrs
    // NOTE: For new patches we will not cache for 1 week
    useEffect(() => {
        loadTeamData(false, setUnitMap, setTeamData);
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
                    <Header
                        sample={teamData?.sample ?? 0}
                        setSelectedGroup={setSelectedGroup}
                        selectedGroup={selectedGroup}
                    />
                    {teamData && !loading ? (<>
                        <TeamsContainer
                            teamData={teamData}
                            unitMap={unitMap}
                            selectedGroup={selectedGroup}
                        />
                    </>) : (<LoadingState />)}
                </Flex>
            </Flex>
        </ChakraProvider>
    );
}
