import * as React from "react"
import {
    ChakraProvider,
    Flex,
    Text,
    theme,
} from "@chakra-ui/react"

export default function App() {
    return (
        <ChakraProvider theme={theme}>
            <Flex>
                <Text>Test</Text>
            </Flex>
        </ChakraProvider>
    );
}
