import {
    Flex,
    Text,
} from "@chakra-ui/react";
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
            setPreviewAguments(augments.slice(0, 10));
        }
    }, [augments]);

    return (
        <Flex
            width="95%"
            borderRadius="10px"
            margin="20px 0px"
            padding="10px"
            height="100px"
            background="white"
            justifyContent="center"
            display="flex"
        >
            <Text
                as="b"
            >
                Best Augments
            </Text>
            <Flex>
                {previewAugments.length > 0 ? (
                    previewAugments.map((a, i) => <AugmentPreview key={i} augment={a} />)
                ) : null}
            </Flex>
        </Flex>
    );
}
