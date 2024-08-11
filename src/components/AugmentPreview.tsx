import {
    Flex,
    Text,
    Code,
} from "@chakra-ui/react";

import { Augment } from "../types/TeamData";
import {
    augmentIdToName,
    formatPercent,
    formatAvg,
} from "../utils/stringFormatter";

interface AugmentPreviewProps {
    augment: Augment
}

export default function AugmentPreview({ augment }: AugmentPreviewProps) {
    return (
        <Flex
            background="#e4d4fc"
            as="b"
            padding="5px 10px"
            margin="5px"
            borderRadius="10px"
            flexDir="column"
            width="235px"
            height="150px"
        >
            {/* Image + Stats */}
            <Flex
                flexDir="row"
            >
                {/* placeholder image */}
                <Flex
                    marginRight="5px"
                >
                    <Flex
                        background="white"
                        borderRadius="10px"
                        w="75px"
                        h="75px"
                    />
                </Flex>

                <Flex
                    flexDir="column"
                >
                    <Text>
                        <Code>
                            Avg - {formatAvg(augment.avg)}
                        </Code>
                    </Text>
                    <Text>
                        <Code>
                            Top 4 - {formatPercent(augment.top4)}
                        </Code>
                    </Text>
                </Flex>
            </Flex>
            <Flex
                marginTop="5px"
            >
                <Text>
                    {augmentIdToName(augment.id)} are long
                </Text>
            </Flex>
        </Flex>
    );
}
