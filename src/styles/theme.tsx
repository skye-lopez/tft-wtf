import { extendTheme } from "@chakra-ui/react";
import "@fontsource-variable/raleway";

const theme = extendTheme({
    styles: {
        global: () => ({
            'html, body': {
                color: 'black',
                background: 'whitesmoke',
            },
        }),
    },
    fonts: {
        heading: `'Raleway Variable', sans-serif`,
        body: `'Raleway Variable', sans-serif`,
    },
});

export default theme
