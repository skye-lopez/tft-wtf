import {
    Flex,
    Text,
    InputGroup,
    Input,
    InputLeftAddon,
    Code,
} from "@chakra-ui/react";
import {
    SearchIcon,
} from "@chakra-ui/icons";
import {
    useState,
    useEffect,
} from "react";

import { Unit } from "../types/TeamData";

import UnitRow from "./UnitRow";
import { parseUnitId, unitIdToName } from "../utils/stringFormatter";


interface UnitsProps {
    units: Unit[]
}

export default function Units({ units }: UnitsProps) {
    const [searchValue, setSearchValue] = useState<string>("");
    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchValue(() => e.target.value.trim().toLowerCase());
    }

    return (
        <Flex
            flexDir="column"
            width="100%"
            justifyContent="center"
            alignItems="center"
        >
            {/* Search */}
            <Flex
                flexDirection="column"
                alignItems="center"
                background="white"
                padding="20px"
                borderRadius="10px"
            >
                <Text
                    as="b"
                    fontSize="2xl"
                    margin="5px"
                >
                    Units search
                </Text>
                <Flex
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
            </Flex>

            <Code
                background="red.100"
                padding="10px"
                borderRadius="10px"
                marginTop="10px"
            >
                This page is in beta, and is a bit slow for now. Please be patient :)
            </Code>

            <Flex
                flexDir="column"
                margin="10px"
            >
                {units.sort((a, b) => a.avg - b.avg).map((u, i) => {
                    if (searchValue === "" || unitIdToName(u.id).toLowerCase().includes(searchValue)) {
                        return (<UnitRow unit={u} key={i} />)
                    }
                })}
            </Flex>
        </Flex>
    );
}
