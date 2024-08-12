import {
    Flex,
    Text,
    Button,
    Code,
} from "@chakra-ui/react";
import {
    QuestionOutlineIcon,
} from "@chakra-ui/icons";
import { FaRegHeart } from "react-icons/fa";

import DataInfoBanner from "./DataInfoBanner";

interface HeaderProps {
    sample: number
}

// TODO: LOTS, this is just a frame for now.
export default function Header({ sample }: HeaderProps) {
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
                    TFT.WTF
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

            <DataInfoBanner
                sample={sample}
            />
        </Flex>
    );
}
