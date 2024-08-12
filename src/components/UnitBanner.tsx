import {
    Flex,
    Button,
    Image,
    Text,
    Code,
    Tooltip,
} from "@chakra-ui/react";

import {
    useState,
    useEffect,
} from "react";

import {
    CloseIcon
} from "@chakra-ui/icons";

import {
    parseUnitId,
    unitIdToName,
    formatAvg,
    formatPercent,
    parseItemId,
} from "../utils/stringFormatter";

import { UnitMap } from "../App";

interface UnitBannerProps {
    unit: string
    unitMap: UnitMap
    removeUnitBanner: Function
}

function getUnitIconURL(unit: string): string {
    const { rawName } = parseUnitId(unit);
    return `https://cdn.metatft.com/cdn-cgi/image/width=48,height=48,format=auto/https://cdn.metatft.com/file/metatft/champions/${rawName.toLowerCase()}.png`;
}

function getItemIconURL(item: string): string {
    return `https://cdn.metatft.com/cdn-cgi/image/width=25,height=25,format=auto/https://cdn.metatft.com/file/metatft/items/${item.toLowerCase()}.png`;
}

export default function UnitBanner({ unit, unitMap, removeUnitBanner }: UnitBannerProps) {
    const [unitData, setUnitData] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [itemsByAvg, setItemsByAverage] = useState<any[]>([]);
    useEffect(() => {
        // TODO: We should have a lower bound for min sample...
        setItemsByAverage(() => {
            const copy = [...unitMap[unit].items];
            copy.sort((a, b) => a.avg - b.avg);
            return copy;
        });
        setUnitData(() => {
            const n = unitMap[unit];
            n.items.sort((a, b) => b.sample - a.sample);
            console.log(n);
            return n;
        })
    }, [unitMap]);

    useEffect(() => {
        if (unitData?.avg) {
            setLoading(false);
        }
    }, [unitData])

    return (
        <Flex
            background="white"
            margin="10px"
            borderRadius="10px"
            padding="10px 15px"
            flexWrap="wrap"
            position="relative"
        >
            {!loading && itemsByAvg.length > 0 ? (
                <Flex
                    wrap="wrap"
                >
                    {/* Image + General Stats */}
                    <Flex>
                        <Image
                            src={getUnitIconURL(unit)}
                            borderRadius="7px"
                            marginRight="10px"
                            height="48px"
                        />
                        <Flex
                            flexDirection="column"
                        >
                            <Text
                                as="b"
                            >
                                {unitIdToName(unit)}
                            </Text>

                            <Code
                                padding="0px 5px"
                            >
                                avg: {formatAvg(unitData.avg)}
                            </Code>

                            <Code
                                padding="0px 5px"
                            >
                                top4: {formatPercent(unitData.top4)}
                            </Code>
                        </Flex>
                    </Flex>

                    {/* Popular Items */}
                    <Flex
                        margin="0px 20px"
                        direction="column"
                    >
                        <Text>
                            Most Popular Items:
                        </Text>

                        <Flex
                            direction="column"
                        >
                            <ItemSet
                                id={unitData.items[0].id}
                                avg={unitData.items[0].avg}
                                sample={unitData.items[0].sample}
                            />

                            <ItemSet
                                id={unitData.items[1].id}
                                avg={unitData.items[1].avg}
                                sample={unitData.items[1].sample}
                            />

                            <ItemSet
                                id={unitData.items[2].id}
                                avg={unitData.items[2].avg}
                                sample={unitData.items[2].sample}
                            />
                        </Flex>
                    </Flex>

                    {/* Best Items */}
                    <Flex
                        margin="0px 20px"
                        direction="column"
                    >
                        <Text>
                            Best Avg Items:
                        </Text>

                        <Flex
                            direction="column"
                        >
                            <ItemSet
                                id={itemsByAvg[0].id}
                                avg={itemsByAvg[0].avg}
                                sample={itemsByAvg[0].sample}
                            />

                            <ItemSet
                                id={itemsByAvg[1].id}
                                avg={itemsByAvg[1].avg}
                                sample={itemsByAvg[1].sample}
                            />

                            <ItemSet
                                id={itemsByAvg[2].id}
                                avg={itemsByAvg[2].avg}
                                sample={itemsByAvg[2].sample}
                            />
                        </Flex>
                    </Flex>

                    <Button
                        onClick={() => removeUnitBanner(unit)}
                        position="absolute"
                        colorScheme="red"
                        right="3"
                    >
                        <CloseIcon boxSize={2} />
                    </Button>
                </Flex>

            ) : null}
        </Flex>
    );
}


interface ItemSetProps {
    id: string
    avg: number
    sample: number
}

function ItemSet({ id, avg, sample }: ItemSetProps) {
    const [itemNames, setItemNames] = useState<string[]>([]);
    const [readableNames, setReadableNames] = useState<string[]>([]);

    useEffect(() => {
        const { readableNames: rn, itemNames: im } = parseItemId(id);
        setItemNames(() => im);
        setReadableNames(() => rn);
    }, []);


    return (
        <Flex
            margin="5px"
        >
            {itemNames.length > 0 ? (
                <Flex>
                    <Flex>
                        <Tooltip
                            label={readableNames[0]}
                        >
                            <Image
                                w="25px"
                                h="25px"
                                src={getItemIconURL(itemNames[0])}
                            />
                        </Tooltip>
                    </Flex>
                    <Flex>
                        <Tooltip
                            label={readableNames[1]}
                        >
                            <Image
                                w="25px"
                                h="25px"
                                src={getItemIconURL(itemNames[1])}
                            />
                        </Tooltip>
                    </Flex>
                    <Flex>
                        <Tooltip
                            label={readableNames[2]}
                        >
                            <Image
                                w="25px"
                                h="25px"
                                src={getItemIconURL(itemNames[2])}
                            />
                        </Tooltip>
                    </Flex>

                    <Code
                        marginLeft="10px"
                    >
                        Avg: {formatAvg(avg)}
                    </Code>

                    <Code
                        marginLeft="5px"
                    >
                        Sample: {sample}
                    </Code>

                </Flex>
            ) : null}
        </Flex>
    );
}
