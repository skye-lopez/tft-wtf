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
            >
                <Text
                    fontSize="2xl"
                    fontWeight="800"
                    background="#A8D"
                    color="white"
                    borderRadius="10px"
                    padding="5px 10px"
                    height="50px"
                >
                    tftstats.xyz
                </Text>
                <Button
                    colorScheme="pink"
                    margin="5px"
                    height="50px"
                    onClick={() => window.open("https://buymeacoffee.com/arialopez", "_blank")}
                >
                    <FaRegHeart
                        size="25px"
                    />
                </Button>
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
                <Tooltip
                    label="Coming soon!"
                >
                    <Button
                        margin="3px 10px"
                        colorScheme={selectedGroup === "builder" ? "blue" : "gray"}
                        isDisabled={true}
                    >
                        Team Builder
                    </Button>
                </Tooltip>
                <Button
                    margin="3px 10px"
                    colorScheme={selectedGroup === "augments" ? "blue" : "gray"}
                    onClick={() => setSelectedGroup("augments")}
                    isDisabled={true}
                >
                    Augments
                </Button>
                <Tooltip
                    label="Coming soon!"
                >
                    <Button
                        margin="3px 10px"
                        colorScheme={selectedGroup === "units" ? "blue" : "gray"}
                        isDisabled={true}
                    >
                        Units
                    </Button>
                </Tooltip>
            </Flex>

            <DataInfoBanner
                sample={sample}
            />
        </Flex>
    );
}
