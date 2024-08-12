import {
    Flex,
    Text,
    Code,
} from "@chakra-ui/react";

import {
    useState,
    useEffect,
} from "react";

import {
    formatAvg,
    formatPercent,
    parseUnitId,
} from "../utils/stringFormatter";

import { Team } from "../types/TeamData";
import { UnitMap } from "../App";
import TeamUnit from "./TeamUnit";
import UnitBanner from "./UnitBanner";

interface TeamProps {
    team: Team
    unitMap: UnitMap
}

export default function TeamInfo({ team, unitMap }: TeamProps) {
    const [unitBanners, setUnitBanners] = useState<string[]>([]);

    function addUnitBanner(unit: string) {
        setUnitBanners((old: string[]) => {
            if (old.indexOf(unit) === -1) {
                return [...old, unit];
            }
            return old;
        });
    }

    function removeUnitBanner(unit: string) {
        setUnitBanners((old: string[]) => {
            const idx = old.indexOf(unit);
            const n = [...old];
            n.splice(idx, 1);
            return n;
        })
    }

    return (
        <Flex
            flexDir="column"
        >
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
                    {team?.unit_ids.map((unit, i) => {
                        const { rawName } = parseUnitId(unit);
                        if (rawName.toLowerCase() === "tft12_yuumi" || rawName.toLowerCase().includes("elderdragon")) {
                            return
                        }
                        return (<TeamUnit unit={unit} addUnitBanner={addUnitBanner} key={i} />)
                    })}
                </Flex>
                {/* Stats */}
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
                            team.sample < 500 ? "red.100"
                                : team.sample < 1000 ? "orange.100"
                                    : "green.100"
                        }
                    >
                        Sample: {team.sample}
                    </Code>
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
            {/* Unit banners */}
            {unitBanners?.map((unit, i) => (<UnitBanner key={i} unit={unit} unitMap={unitMap} removeUnitBanner={removeUnitBanner} />))}
        </Flex>
    );
}
