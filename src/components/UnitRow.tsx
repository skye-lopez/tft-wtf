import {
    Flex,
    Text,
    Image,
    Code,
    Tooltip,
} from "@chakra-ui/react";
import {
    useEffect,
    useState,
} from "react";
import { Unit } from "../types/TeamData";
import unitMetaData from "../utils/UnitMetaData";
import {
    unitIdToName,
    parseUnitId,
    formatAvg,
    formatPercent,
    parseItemId,
} from "../utils/stringFormatter";

interface UnitRowProps {
    unit: Unit
}

function getUnitIconURL(unit: string): string {
    const { rawName } = parseUnitId(unit);
    const url = `https://cdn.metatft.com/cdn-cgi/image/width=48,height=48,format=auto/https://cdn.metatft.com/file/metatft/champions/${rawName.toLocaleLowerCase()}.png`;
    return url;
}

function getItemIconURL(item: string): string {
    return `https://cdn.metatft.com/cdn-cgi/image/width=25,height=25,format=auto/https://cdn.metatft.com/file/metatft/items/${item.toLowerCase()}.png`;
}

export default function UnitRow({ unit }: UnitRowProps) {
    const name = unitIdToName(unit.id);
    const { cost } = unitMetaData[name];
    return (
        <Flex
            width="100%"
            background="white"
            margin="15px 10px"
            padding="10px"
            borderRadius="10px"
        >
            {/* Image + Name */}
            <Flex
                direction="column"
                marginRight="10px"
            >
                <Image
                    src={getUnitIconURL(unit.id)}
                    w="48px"
                    h="48px"
                    border={
                        cost === 5 ? "2px solid yellow"
                            : cost === 4 ? "2px solid purple"
                                : cost === 3 ? "2px solid blue"
                                    : cost === 2 ? "2px solid green"
                                        : cost === 1 ? "2px solid gray"
                                            : "2px solid black"
                    }
                    borderRadius="5px"
                    _hover={{ border: "2px solid yellow" }}
                />
                <Text
                    as="b"
                >
                    {name}
                </Text>
            </Flex>
            {/* Items + Stats */}
            <Flex
                flexDir="column"
            >
                {/* Stats */}
                <Text
                    as="b"
                >
                    Overall Placements
                </Text>
                <Flex
                    width="100%"
                    flexDirection="row"
                    wrap="wrap"
                    marginBottom="10px"
                >
                    <Code
                        margin="2px"
                        padding="5px 10px"
                        borderRadius="10px"
                        background={
                            unit.sample < 500 ? "red.100"
                                : unit.sample < 1000 ? "orange.100"
                                    : "green.100"
                        }
                    >
                        Sample: {unit.sample}
                    </Code>
                    <Code
                        margin="2px"
                        padding="5px 10px"
                        borderRadius="10px"
                        background={
                            unit.avg > 5 ? "red.100"
                                : unit.avg > 4.2 ? "orange.100"
                                    : "green.100"
                        }
                    >
                        Avg: {formatAvg(unit.avg)}
                    </Code>

                    <Code
                        margin="2px"
                        padding="5px 10px"
                        borderRadius="10px"
                        background={
                            unit.top4 < 41 ? "red.100"
                                : unit.top4 < 49 ? "orange.100"
                                    : "green.100"
                        }
                    >
                        Top 4: {formatPercent(unit.top4)}
                    </Code>

                    <Code
                        margin="2px"
                        padding="5px 10px"
                        borderRadius="10px"
                        background={
                            unit.top3 < 20 ? "red.100"
                                : unit.top3 < 30 ? "orange.100"
                                    : "green.100"
                        }
                    >
                        Top 3: {formatPercent(unit.top3)}
                    </Code>

                    <Code
                        margin="2px"
                        padding="5px 10px"
                        borderRadius="10px"
                        background={
                            unit.top2 < 15 ? "red.100"
                                : unit.top2 < 20 ? "orange.100"
                                    : "green.100"
                        }
                    >
                        Top 2: {formatPercent(unit.top2)}
                    </Code>

                    <Code
                        margin="2px"
                        padding="5px 10px"
                        borderRadius="10px"
                        background={
                            unit.top1 < 5 ? "red.100"
                                : unit.top1 < 10 ? "orange.100"
                                    : "green.100"
                        }
                    >
                        Top 1: {formatPercent(unit.top1)}
                    </Code>
                </Flex>
                {/* Items */}
                <Text
                    as="b"
                >
                    Most frequent items:
                </Text>
                <Flex
                    flexDir="row"
                    wrap="wrap"
                >
                    {unit.items.sort((a, b) => b.sample - a.sample).slice(0, 10).map((item, i) => {
                        return (
                            <ItemSet
                                key={i}
                                id={item.id}
                                avg={item.avg}
                                sample={item.sample}
                            />
                        );
                    })}
                </Flex>
            </Flex>
        </Flex >
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
