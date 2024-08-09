import * as React from "react"
import {
    ChakraProvider,
    Flex,
    Text,
} from "@chakra-ui/react"
import theme from "./styles/theme";

import Header from "./components/Header";

export default function App() {
    return (
        <ChakraProvider theme={theme}>
            {/* Global container */}
            <Flex
                display="flex"
                alignItems="center"
                justifyContent="center"
                w="100%"
                h="100%"
            >
                {/* Content container */}
                <Flex
                    display="flex"
                    alignItems="center"
                    width="100%"
                    maxWidth="1000px"
                >
                    <Header />
                </Flex>
            </Flex>
        </ChakraProvider>
    );
}
