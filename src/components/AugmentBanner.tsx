import {
    Flex,
    Text,
} from "@chakra-ui/react";
import {
    ArrowForwardIcon,
} from "@chakra-ui/icons";
import {
    useEffect,
    useState,
} from "react";
import { Augment } from "../types/TeamData";
import AugmentPreview from "./AugmentPreview";

interface AugmentBannerProps {
    augments: Augment[]
}

export default function AugmentBanner({ augments }: AugmentBannerProps) {
    const [previewAugments, setPreviewAguments] = useState<Augment[]>([]);

    useEffect(() => {
        if (augments.length > 0) {
            setPreviewAguments(augments.slice(0, 5));
        }
    }, [augments]);

    return (
        <Flex
            width="95%"
            borderRadius="10px"
            margin="20px 0px"
            padding="10px 15px"
            background="white"
            justifyContent="center"
            alignItems="center"
            display="flex"
            flexDirection="column"
        >
            <Text
                as="b"
            >
                Top Augments
            </Text>
            <Flex
                alignItems="center"
                flexWrap="wrap"
            >
                {previewAugments.length > 0 ? (
                    previewAugments.map((a, i) => <AugmentPreview key={i} augment={a} />)
                ) : null}
                <Flex
                    width="200px"
                    alignItems="center"
                    justifyContent="center"
                    flexDir="column"
                    background="pink.200"
                    height="110px"
                    borderRadius="10px"
                    _hover={{ background: "pink.500", color: "white", cursor: "pointer", fontWeight: "bold" }}
                >
                    <Text>
                        All Augments
                    </Text>
                    <ArrowForwardIcon
                        boxSize={10}
                    />
                </Flex>
            </Flex>
        </Flex>
    );
}
