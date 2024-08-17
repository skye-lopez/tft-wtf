import {
    Flex,
    Text,
    Image,
    Code,
    InputGroup,
    Input,
    InputLeftAddon,
} from "@chakra-ui/react";
import {
    SearchIcon,
} from "@chakra-ui/icons";
import {
    useEffect,
    useState,
} from "react";
import { Augment } from "../types/TeamData";
import {
    parseAugmentId,
} from "../utils/stringFormatter";

import augmentMetaData from "../utils/AugmentMetaData";
import AugmentRow from "./AugmentRow";

interface AugmentsProps {
    augmentData: Augment[]
}

export default function Augments({ augmentData }: AugmentsProps) {
    const [searchValue, setSearchValue] = useState<string>("");
    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchValue(() => e.target.value.trim().toLowerCase());
    }
    return (
        <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            width="100%"
        >
            <Text
                as="b"
                fontSize="2xl"
            >
                Augments
            </Text>
            <Code
                background="purple.100"
                padding="10px"
                margin="10px 10px"
                textAlign={"center"}
                borderRadius="10px"
                as="b"
                width="fit-content"
            >
                Augments sorted by Avg, search for a specific augment.
            </Code>

            {/* Search */}
            <Flex
                background="white"
                padding="10px 20px"
                borderRadius="10px"
            >
                <InputGroup>
                    <InputLeftAddon>
                        <SearchIcon />
                    </InputLeftAddon>
                    <Input
                        value={searchValue}
                        onChange={handleSearch}
                    />
                </InputGroup>
            </Flex>

            {/* Result */}
            {
                augmentData.map((a, i) => {
                    const { rawName } = parseAugmentId(a.id);
                    const { displayName } = augmentMetaData[rawName];
                    if (searchValue === "" || displayName.toLowerCase().includes(searchValue)) {
                        return (
                            <AugmentRow augment={a} key={i} />
                        );
                    }
                    return null;
                })
            }
        </Flex>
    );
}
