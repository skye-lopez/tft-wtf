import {
    Flex,
    Text,
} from "@chakra-ui/react";

import { HashLoader } from "react-spinners";

export default function LoadingState() {
    return (
        <Flex
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            height="200px"
            width="200px"
            borderRadius="20px"
            background="white"
        >
            <HashLoader
                color="#A8D"
            />
            <Text
                marginTop="30px"
                as="b"
                color="#A8D"
            >
                Loading!
            </Text>
        </Flex>
    );
}
