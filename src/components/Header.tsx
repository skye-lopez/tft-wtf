import {
    Flex,
    Text,
    Icon,
    Button,
    Input,
    InputGroup,
    InputLeftAddon,
} from "@chakra-ui/react";
import {
    SearchIcon,
} from "@chakra-ui/icons";
import { FaRegHeart } from "react-icons/fa";

// TODO: LOTS, this is just a frame for now.
export default function Header() {
    return (
        <Flex
            display="flex"
            flexDirection="row"
            w="100%"
            justifyContent="space-between"
            alignItems="center"
            padding="10px"
            margin="10px 0px"
            marginBottom="20px"
            background="white"
            flexWrap="wrap"
            borderRadius="10px"
        >
            {/* LOGO */}
            <Text
                fontSize="2xl"
                fontWeight="800"
                background="#A8D"
                color="white"
                borderRadius="10px"
                padding="5px 10px"
            >
                TFT.WTF
            </Text>
            {/* SEARCH */}

            {/* Buttons */}
            <Flex
            >
                <Flex
                    margin="5px"
                >
                    <InputGroup>
                        <InputLeftAddon>
                            <SearchIcon />
                        </InputLeftAddon>
                        <Input
                            width="100%"
                        />
                    </InputGroup>
                </Flex>
                <Button
                    margin="5px"
                >
                    Units
                </Button>
                <Button
                    margin="5px"
                >
                    Augments
                </Button>
                <Button
                    colorScheme="purple"
                    margin="5px"
                >
                    Teams
                </Button>
                <Button
                    colorScheme="pink"
                    margin="5px"
                >
                    <Icon as={FaRegHeart} />
                </Button>
            </Flex>

        </Flex>
    );
}
