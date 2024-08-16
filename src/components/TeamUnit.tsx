import {
    Flex,
    Text,
    Image,
} from "@chakra-ui/react";
import {
    unitIdToName,
    parseUnitId,
} from "../utils/stringFormatter";
import unitMetaData from "../utils/UnitMetaData";

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
    const name = unitIdToName(unit);
    const cost = unitMetaData[name]?.cost;
    return (
        <Flex
            flexDir="column"
            margin="5px 10px"
            maxWidth="50px"
            _hover={{ cursor: "pointer" }}
            onClick={() => addUnitBanner(unit)}
            background="whitesmoke"
            borderRadius="10px"
        >
            {/* Image placeholder */}
            <Flex>
                <Image
                    src={getUnitIconURL(unit)}
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
            </Flex>
            <Text
                fontSize="xs"
            >
                {unitIdToName(unit)}
            </Text>
        </Flex>
    );
}
