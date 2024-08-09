import {
    Flex,
    Text,
} from "@chakra-ui/react";

interface DataInfoBannerProps {
    sample: number
}

export default function DataInfoBanner({ sample }: DataInfoBannerProps) {
    return (
        <Flex>
            <Flex>
                <Flex
                    background="white"
                    borderRadius="10px"
                    alignItems="center"
                    padding="5px 10px"
                    margin="0px 5px"
                >
                    <Text
                        fontWeight="600"
                        marginRight="5px"
                    >
                        Current Patch:
                    </Text>
                    <Text
                        as="b"
                        color="#A8D"
                    >
                        14.15
                    </Text>
                </Flex>
                <Flex
                    background="white"
                    borderRadius="10px"
                    alignItems="center"
                    padding="5px 10px"
                    margin="0px 5px"
                >
                    <Text
                        fontWeight="600"
                        marginRight="5px"
                    >
                        Sample Size:
                    </Text>
                    <Text
                        as="b"
                        color="#A8D"
                    >
                        {sample}
                    </Text>
                </Flex>
                <Flex
                    background="white"
                    borderRadius="10px"
                    alignItems="center"
                    padding="5px 10px"
                    margin="0px 5px"
                >
                    <Text
                        fontWeight="600"
                        marginRight="5px"
                    >
                        Rank:
                    </Text>
                    <Text
                        as="b"
                        color="#A8D"
                    >
                        Master+
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    );
}
