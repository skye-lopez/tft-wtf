import {
    Flex,
    Text,
    Icon,
    Button,
} from "@chakra-ui/react";
import { FaRegHeart } from "react-icons/fa";

export default function Header() {
    return (
        <Flex
            display="flex"
            flexDirection="row"
            w="100%"
            justifyContent="space-between"
            alignItems="center"
            padding="10px"
            marginBottom="20px"
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

            <Button
                leftIcon={<Icon as={FaRegHeart} />}
                colorScheme="pink"
            >
                Support Us
            </Button>
        </Flex>
    );
}
