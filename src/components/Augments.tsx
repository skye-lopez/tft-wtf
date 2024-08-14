import {
    Flex,
    Text,
    Code,
    Input,
    InputGroup,
    InputLeftAddon,
} from "@chakra-ui/react";
import {
    SearchIcon,
} from "@chakra-ui/icons";
import {
    useState,
    useEffect,
} from "react";

import { Augment } from "../types/TeamData";
import { parseAugmentId } from "../utils/stringFormatter";

interface AugmentProps {
    augmentData: Augment[]
}

export default function Augments({ augmentData }: AugmentProps) {
    console.log(augmentData)
    const [searchValue, setSearchValue] = useState<string>("");
    const [searchResults, setSearchResults] = useState<Augment[]>([]);

    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchValue(() => e.target.value);
    }

    useEffect(() => {
        if (searchValue === "") {
            setSearchResults(() => augmentData);
            return;
        }
        setSearchResults(() => {
            const filtered = augmentData.filter((a) => {
                const { readableName } = parseAugmentId(a.id);
                let search = searchValue.replace(/\s/g, '');

                if ((readableName.toLowerCase()).includes(search.toLowerCase())) {
                    return true;
                }

            });
            return filtered;
        });
    }, [searchValue]);

    return (
        <Flex
            flexDir="column"
            width="100%"
            alignItems="center"
            justifyContent="center"
        >
            <Flex
                width="100%"
                justifyContent="center"
            >
                <Code
                    background="purple.100"
                    padding="10px"
                    margin="10px 10px"
                    textAlign={"center"}
                    borderRadius="10px"
                    as="b"
                    width="fit-content"
                >
                    View all augments or search below
                </Code>
            </Flex>
            {/* SEARCH BAR */}
            <Flex
                background="white"
                padding="10px"
                borderRadius="10px"
                margin="10px"
                maxWidth="90vw"
                alignItems="center"
                justifyContent="center"
            >
                <InputGroup>
                    <InputLeftAddon>
                        <SearchIcon />
                    </InputLeftAddon>
                    <Input
                        value={searchValue}
                        onChange={handleInput}
                    />
                </InputGroup>
            </Flex>
            {/* Results */}
            <Flex
                width="100%"
                wrap="wrap"
                flexDir="column"
            >
                {searchResults.map((a, i) => <AugmentInfo augment={a} key={i} />)}
            </Flex>
        </Flex>
    );
}

interface AugmentInfoProps {
    augment: Augment
    key: number
}

function AugmentInfo({ augment }: AugmentInfoProps) {
    const { rawName, readableName } = parseAugmentId(augment.id);
    return (
        <Flex
            margin="10px"
        >
            <Code>
                {readableName}
            </Code>
        </Flex>
    );
}
