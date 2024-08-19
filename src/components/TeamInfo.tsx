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
    unitIdToName,
} from "../utils/stringFormatter";

import unitMetaData from "../utils/UnitMetaData";
import traitMetaData from "../utils/TraitMetaData";

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
    const [traits, setTraits] = useState<any>([]);

    function addUnitBanner(unit: string) {
        setUnitBanners((old: string[]) => {
            if (old.indexOf(unit) === -1) {
                return [...old, unit];
            }
            return [...old];
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

    useEffect(() => {
        if (!team) return;
        setTraits(() => {
            const t: any = {};
            for (const unitId of team.unit_ids) {
                const unitTraits = unitMetaData[unitIdToName(unitId)].traits;
                unitTraits.forEach((trait: string) => t?.[trait] ? t[trait]++ : t[trait] = 1);
            }
            const sortedT = [];
            for (const [key, value] of Object.entries(t)) {
                sortedT.push([key, value]);
            }
            sortedT.sort((a: any, b: any) => b[1] - a[1]);
            return sortedT;
        })
    }, []);

    useEffect(() => {
        console.log(traits);
    }, [traits]);

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
                    wrap="wrap"
                >
                    {traits.map((t: any) => {
                        if (t[1] < traitMetaData[t[0]]) return null;
                        return (
                            <Text
                                as="b"
                                background="whitesmoke"
                                borderRadius="10px"
                                padding="2px 5px"
                                margin="3px"
                            >
                                {t[1]} {t[0]}
                            </Text>

                        );
                    })}
                </Flex>
                <Flex
                    justifyContent="flex-start"
                    width="100%"
                    flexWrap="wrap"
                >
                    {team?.unit_ids.sort((a, b) => {
                        const aName = unitIdToName(a);
                        const bName = unitIdToName(b);
                        return unitMetaData[aName].cost - unitMetaData[bName].cost
                    }).map((unit, i) => {
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
