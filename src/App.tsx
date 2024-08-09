import * as React from "react"
import {
    ChakraProvider,
    Flex,
    Text,
} from "@chakra-ui/react"
import theme from "./styles/theme";

export default function App() {
    return (
        <ChakraProvider theme={theme}>
            <Flex>
                <Text>TFT.WTF</Text>
            </Flex>
        </ChakraProvider>
    );
}
