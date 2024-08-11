import {
    Flex,
    Text,
} from "@chakra-ui/react";
import {
    unitIdToName,
} from "../utils/stringFormatter";

interface TeamUnitProps {
    unit: string
}

export default function TeamUnit({ unit }: TeamUnitProps) {
    return (
        <Flex
            flexDir="column"
            width="100px"
        >
            {/* Image placeholder */}
            <Flex>
                <Flex
                    background="red"
                    w="50px"
                    h="50px"
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
