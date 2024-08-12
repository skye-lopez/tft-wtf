import {
    Flex,
    Text,
    Image,
} from "@chakra-ui/react";
import {
    unitIdToName,
    parseUnitId,
} from "../utils/stringFormatter";

interface TeamUnitProps {
    unit: string
    addUnitBanner: Function
}

// NOTE: Cheesy but we can use metatfts cdn for now.
function getUnitIconURL(unit: string): string {
    const { rawName } = parseUnitId(unit);
    const url = `https://cdn.metatft.com/cdn-cgi/image/width=48,height=48,format=auto/https://cdn.metatft.com/file/metatft/champions/${rawName.toLocaleLowerCase()}.png`;
    return url;
}

export default function TeamUnit({ unit, addUnitBanner }: TeamUnitProps) {
    return (
        <Flex
            flexDir="column"
            margin="5px 10px"
            maxWidth="50px"
            _hover={{ cursor: "pointer" }}
            onClick={() => addUnitBanner(unit)}
        >
            {/* Image placeholder */}
            <Flex>
                <Image
                    src={getUnitIconURL(unit)}
                    w="48px"
                    h="48px"
                    border="2px solid black"
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
