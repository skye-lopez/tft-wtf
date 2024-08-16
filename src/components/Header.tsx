import {
    Flex,
    Text,
    Button,
    Tooltip,
} from "@chakra-ui/react";
import { FaRegHeart } from "react-icons/fa";

import DataInfoBanner from "./DataInfoBanner";

interface HeaderProps {
    sample: number
    setSelectedGroup: Function
    selectedGroup: string
}

// TODO: LOTS, this is just a frame for now.
export default function Header({ sample, setSelectedGroup, selectedGroup }: HeaderProps) {
    return (
        <Flex
            display="flex"
            flexDirection="row"
            w="100%"
            justifyContent="space-evenly"
            alignItems="center"
            padding="10px"
            margin="10px 0px"
            marginBottom="20px"
            background="white"
            flexWrap="wrap"
            borderRadius="10px"
        >
            {/* LOGO */}
            <Flex
                alignItems="center"
                background="#A8D"
                color="white"
                borderRadius="10px"
                padding="5px 10px"
                height="50px"
            >
                <Text
                    fontSize="2xl"
                    fontWeight="800"
                >
                    tftstats.xyz
                </Text>
                <Text
                    marginLeft="2px"
                    fontWeight="500"
                >
                    (beta)
                </Text>
            </Flex>
            <Flex
                background="white"
                padding="10px 3px"
                borderRadius="10px"
                wrap="wrap"
            >
                <Button
                    margin="3px 10px"
                    colorScheme={selectedGroup === "teams" ? "blue" : "gray"}
                    onClick={() => setSelectedGroup("teams")}
                >
                    Top Teams
                </Button>
                <Button
                    margin="3px 10px"
                    colorScheme={selectedGroup === "builder" ? "blue" : "gray"}
                    onClick={() => setSelectedGroup("builder")}
                >
                    Team Builder
                </Button>
                <Button
                    margin="3px 10px"
                    colorScheme={selectedGroup === "units" ? "blue" : "gray"}
                    onClick={() => setSelectedGroup("units")}
                >
                    Units
                </Button>
                <Tooltip
                    label="Coming soon!"
                >
                    <Button
                        margin="3px 10px"
                        colorScheme={selectedGroup === "augments" ? "blue" : "gray"}
                        onClick={() => setSelectedGroup("augments")}
                        isDisabled={true}
                    >
                        Augments
                    </Button>
                </Tooltip>
            </Flex>

            <DataInfoBanner
                sample={sample}
            />
        </Flex>
    );
}
