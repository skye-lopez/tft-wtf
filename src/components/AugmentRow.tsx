import {
    Flex,
    Text,
    Image,
    Code,
} from "@chakra-ui/react";
import { Augment } from "../types/TeamData";
import augmentMetaData from "../utils/AugmentMetaData";
import {
    parseAugmentId,
    formatAvg,
    formatPercent,
} from "../utils/stringFormatter";

interface AugmentRowProps {
    augment: Augment
}
export default function AugmentRow({ augment }: AugmentRowProps) {
    const { rawName } = parseAugmentId(augment.id);
    const { displayName, imageUrl } = augmentMetaData[rawName];
    return (
        <Flex
            width="100%"
        >
            <Flex
                margin="10px"
                width="100%"
                padding="10px"
                borderRadius="10px"
                background="white"
            >
                {/* Image + Title */}
                <Flex
                    flexDir="column"
                >
                    <Image
                        src={imageUrl}
                        width="48px"
                        height="48px"
                        minWidth="48px"
                        minHeight="48px"
                        background="black"
                        borderRadius="10px"
                    />
                </Flex>

                {/* Stats */}
                <Flex
                    flexDir="column"
                    marginLeft="10px"
                >
                    <Text
                        as="b"
                    >
                        {displayName}
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
                                augment.sample < 500 ? "red.100"
                                    : augment.sample < 1000 ? "orange.100"
                                        : "green.100"
                            }
                        >
                            Sample: {augment.sample}
                        </Code>
                        <Code
                            margin="2px"
                            padding="5px 10px"
                            borderRadius="10px"
                            background={
                                augment.avg > 5 ? "red.100"
                                    : augment.avg > 4.2 ? "orange.100"
                                        : "green.100"
                            }
                        >
                            Avg: {formatAvg(augment.avg)}
                        </Code>

                        <Code
                            margin="2px"
                            padding="5px 10px"
                            borderRadius="10px"
                            background={
                                augment.top4 < 41 ? "red.100"
                                    : augment.top4 < 49 ? "orange.100"
                                        : "green.100"
                            }
                        >
                            Top 4: {formatPercent(augment.top4)}
                        </Code>

                        <Code
                            margin="2px"
                            padding="5px 10px"
                            borderRadius="10px"
                            background={
                                augment.top3 < 20 ? "red.100"
                                    : augment.top3 < 30 ? "orange.100"
                                        : "green.100"
                            }
                        >
                            Top 3: {formatPercent(augment.top3)}
                        </Code>

                        <Code
                            margin="2px"
                            padding="5px 10px"
                            borderRadius="10px"
                            background={
                                augment.top2 < 15 ? "red.100"
                                    : augment.top2 < 20 ? "orange.100"
                                        : "green.100"
                            }
                        >
                            Top 2: {formatPercent(augment.top2)}
                        </Code>

                        <Code
                            margin="2px"
                            padding="5px 10px"
                            borderRadius="10px"
                            background={
                                augment.top1 < 5 ? "red.100"
                                    : augment.top1 < 10 ? "orange.100"
                                        : "green.100"
                            }
                        >
                            Top 1: {formatPercent(augment.top1)}
                        </Code>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}
