import {
    Flex,
    Text,
    Code,
    InputGroup,
    Input,
    InputLeftAddon,
    Image,
    Button,
} from "@chakra-ui/react";
import {
    SearchIcon,
} from "@chakra-ui/icons";
import {
    useState,
    useEffect,
} from "react";
import axios from "axios";
import {
    get,
    set
} from "../utils/localStorage";
import {
    parseUnitId,
    unitIdToName,
    formatPercent,
    formatAvg,
} from "../utils/stringFormatter";
import { Team } from "../types/TeamData";
import LoadingState from "./LoadingState";
import { UnitMap } from "../App";

interface TeamBuilderData {
    [key: string]: Team
}

async function getBuilderData(cache: boolean, setFormattedTeams: Function) {
    let builderData;
    if (cache) { builderData = get("builderData"); }
    if (!builderData) {
        builderData = (await axios.get("https://tft-wtf-static.s3.us-west-1.amazonaws.com/data_large.json")).data;
    }

    const formattedTeams: TeamBuilderData = {};
    builderData.teams.forEach((d: Team) => formattedTeams[d.id] = d);

    if (cache) { set("builderData", formattedTeams, { expires: true, expireType: "days", expireLength: 1 }); }
    setFormattedTeams(formattedTeams);
}

interface TeamBuilderProps {
    unitMap: UnitMap
}

export default function TeamBuilder({ unitMap }: TeamBuilderProps) {
    const [formattedTeams, setFormattedTeams] = useState<TeamBuilderData>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedUnits, setSelectedUnits] = useState<string[]>([]);
    const [teamInfo, setTeamInfo] = useState<Team>();

    function getTeamKeyFromUnits(): string {
        if (selectedUnits.length === 0) return "null";
        let result = "";
        const [_, set, patch] = selectedUnits[0].split("~");
        selectedUnits.sort((a, b) => a.localeCompare(b));
        selectedUnits.forEach((u) => {
            const [name] = u.split("~");
            result += `${name}~`;
        });
        result += `${set}~${patch}`;
        return result;
    }

    function addUnitToSelection(unit: string) {
        setSelectedUnits((curr) => {
            if (curr.indexOf(unit) === -1) {
                return [...curr, unit];
            }
            return curr;
        });
    }

    function removeUnitFromSelection(unit: string) {
        setSelectedUnits((curr) => {
            const idx = curr.indexOf(unit);
            let n = [...curr];
            if (idx !== -1) {
                n.splice(idx, 1);
            }
            return n;
        })
    }

    const [searchValue, setSearchValue] = useState<string>("");
    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchValue(() => e.target.value.trim().toLowerCase());
    }

    useEffect(() => {
        getBuilderData(false, setFormattedTeams);

        window.onbeforeunload = (e) => {
            return "Data may be lost";
        }

        return () => {
            window.onbeforeunload = null;
        }
    }, []);

    useEffect(() => {
        if (Object.keys(formattedTeams).length > 0) {
            setLoading(false);
        }
    }, [formattedTeams]);

    useEffect(() => {
        if (selectedUnits.length === 0) return;
        const teamKey = getTeamKeyFromUnits();
        const team = formattedTeams?.[teamKey];
        console.log(teamKey)
        console.log(team)
        setTeamInfo(team);
    }, [selectedUnits]);

    const render = !loading ? (
        <Flex
            flexDir="column"
            alignItems="center"
        >
            <Text
                as="b"
                fontSize="2xl"
            >
                Team builder
            </Text>
            <Code
                background="purple.100"
                padding="10px"
                margin="10px 10px"
                textAlign={"center"}
                borderRadius="10px"
                as="b"
                width="fit-content"
            >
                Select a team to see its stats! (Teams must be 5+ units and have been played atleast 10 times)
            </Code>
            {/* BUILDER */}
            <Flex
                width="100%"
                justifyContent="center"
                margin="10px"
                flexDirection="column"
            >
                {/* TEAM DISPLAY */}
                <Flex
                    background="white"
                    borderRadius="10px"
                    padding="10px"
                    margin="10px"
                    flexDir="column"
                    wrap="wrap"
                >
                    {selectedUnits.length > 0 ? (
                        <Flex
                            alignItems="center"
                            margin="5px"
                            width="100%"
                            justifyContent="space-between"
                        >
                            <Text
                                as="b"
                            >
                                Results [Click a unit to remove]
                            </Text>
                            <Button
                                size="sm"
                                margin="0px 5px"
                                colorScheme="red"
                                onClick={() => setSelectedUnits([])}
                            >
                                Remove all
                            </Button>
                        </Flex>

                    ) : null}
                    <Flex
                        flexDirection="row"
                        wrap="wrap"
                    >
                        {selectedUnits.map((u) => <UnitIcon unit={u} updateEvent={removeUnitFromSelection} />)}
                    </Flex>
                    {teamInfo && selectedUnits.length >= 5 ? (
                        <Flex>
                            <Flex
                                width="100%"
                                flexDirection="row"
                                wrap="wrap"
                            >
                                <Code
                                    margin="2px"
                                    padding="5px 10px"
                                    borderRadius="10px"
                                    background={
                                        teamInfo.sample < 500 ? "red.100"
                                            : teamInfo.sample < 1000 ? "orange.100"
                                                : "green.100"
                                    }
                                >
                                    Sample: {teamInfo.sample}
                                </Code>
                                <Code
                                    margin="2px"
                                    padding="5px 10px"
                                    borderRadius="10px"
                                    background={
                                        teamInfo.avg > 5 ? "red.100"
                                            : teamInfo.avg > 4.2 ? "orange.100"
                                                : "green.100"
                                    }
                                >
                                    Avg: {formatAvg(teamInfo.avg)}
                                </Code>

                                <Code
                                    margin="2px"
                                    padding="5px 10px"
                                    borderRadius="10px"
                                    background={
                                        teamInfo.top4 < 41 ? "red.100"
                                            : teamInfo.top4 < 49 ? "orange.100"
                                                : "green.100"
                                    }
                                >
                                    Top 4: {formatPercent(teamInfo.top4)}
                                </Code>

                                <Code
                                    margin="2px"
                                    padding="5px 10px"
                                    borderRadius="10px"
                                    background={
                                        teamInfo.top3 < 20 ? "red.100"
                                            : teamInfo.top3 < 30 ? "orange.100"
                                                : "green.100"
                                    }
                                >
                                    Top 3: {formatPercent(teamInfo.top3)}
                                </Code>

                                <Code
                                    margin="2px"
                                    padding="5px 10px"
                                    borderRadius="10px"
                                    background={
                                        teamInfo.top2 < 15 ? "red.100"
                                            : teamInfo.top2 < 20 ? "orange.100"
                                                : "green.100"
                                    }
                                >
                                    Top 2: {formatPercent(teamInfo.top2)}
                                </Code>

                                <Code
                                    margin="2px"
                                    padding="5px 10px"
                                    borderRadius="10px"
                                    background={
                                        teamInfo.top1 < 5 ? "red.100"
                                            : teamInfo.top1 < 10 ? "orange.100"
                                                : "green.100"
                                    }
                                >
                                    Top 1: {formatPercent(teamInfo.top1)}
                                </Code>
                            </Flex>
                        </Flex>
                    ) : selectedUnits.length < 5 ? (<Code>Please select more units</Code>)
                        : (<Code>This team has less than 50 games played, no reliable data available.</Code>)}
                </Flex>
                {/* UNIT SELECTION */}
                <Flex
                    width="100%"
                    alignItems="center"
                    justifyContent="center"
                    flexDir="column"
                    background="white"
                    borderRadius="10px"
                    padding="10px"
                    margin="10px"
                >
                    {/* Search filtering */}
                    <Text
                        as="b"
                    >
                        Click a unit to select
                    </Text>
                    <Flex>
                        <InputGroup>
                            <InputLeftAddon>
                                <SearchIcon />
                            </InputLeftAddon>
                            <Input
                                value={searchValue}
                                onChange={handleSearch}
                            />
                        </InputGroup>
                    </Flex>

                    {/* Display units to select */}
                    <Flex
                        wrap="wrap"
                        margin="10px"
                    >
                        {Object.keys(unitMap).sort((a, b) => a.localeCompare(b)).map((u) => {
                            const lower = u.toLowerCase();
                            const readableName = unitIdToName(u).toLowerCase();
                            if (lower.includes("elder") || lower.includes("winter") || lower.includes("yuumi")) {
                                return null;
                            }
                            if (searchValue === "" || readableName.includes(searchValue)) {
                                return (<UnitIcon unit={u} updateEvent={addUnitToSelection} />)
                            }
                            return null;
                        })}
                    </Flex>
                </Flex>
            </Flex >
        </Flex >
    ) : (<LoadingState />)

    return render;
}

interface UnitIconProps {
    unit: string
    updateEvent: Function
}

function getUnitIconURL(unit: string): string {
    const { rawName } = parseUnitId(unit);
    const url = `https://cdn.metatft.com/cdn-cgi/image/width=48,height=48,format=auto/https://cdn.metatft.com/file/metatft/champions/${rawName.toLocaleLowerCase()}.png`;
    return url;
}

function UnitIcon({ unit, updateEvent }: UnitIconProps) {
    const [selected, setSelected] = useState(false);

    return (
        <Flex
            flexDir="column"
            margin="5px 10px"
            maxWidth="50px"
            _hover={{ cursor: "pointer" }}
            background="whitesmoke"
            borderRadius="10px"
            onClick={() => updateEvent(unit)}
        >
            {/* Image placeholder */}
            <Flex>
                <Image
                    src={getUnitIconURL(unit)}
                    w="48px"
                    h="48px"
                    border="1px solid pink"
                    borderRadius="5px"
                    _hover={{ border: "2px solid yellow" }}
                />
            </Flex>
            <Text
                fontSize="xs"
            >
                {unitIdToName(unit)}
            </Text>
        </Flex>
    );
}
