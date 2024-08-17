import { PulseLoader } from "react-spinners";

function augmentIdToName(id: string): string {
    let readableName = "";
    // Format: TFT<setNumber>_Augment_{Name (can contain _)}~Set~Patch
    const splitId = id.split("Augment_");
    const augmentName = splitId[1];
    const splitName = augmentName.split("~");

    // TODO: Edge casee
    // NOTE: We may want to extract the non readable name (before split)
    let wordsString;
    if (splitName[0].includes("_")) {
        wordsString = splitName[0].split("_")[1];
    } else {
        wordsString = splitName[0];
    }

    readableName += wordsString[0];
    for (let i = 1; i < wordsString.length; i++) {
        const char = wordsString[i];
        if (char == char.toUpperCase()) {
            if (char === "I" && wordsString?.[i - 1] === "I") {
            } else {
                readableName += " ";
            }
        }
        readableName += wordsString[i];
    }

    return readableName;
}

// TODO: Space between words
function unitIdToName(unit: string): string {
    // TFT<Set>_{Name}~<Set>~<Patch>
    let splitName = unit.split("_");
    splitName = splitName[1].split("~");
    const name = splitName[0];
    if (name === "Blitzcrank") return "Blitz";
    if (name === "Mordekaiser") return "Mord";
    if (name === "TahmKench") return "Tahm";
    if (name === "Cassiopeia") return "Cassio";
    return name;
}

interface UnitIdInfo {
    set: string
    patch: string
    rawName: string
}
function parseUnitId(unit: string): UnitIdInfo {
    const [rawName, set, patch] = unit.split("~");
    return {
        rawName,
        set,
        patch
    }
}

interface ItemInfo {
    itemNames: string[]
    readableNames: string[]
}

function parseItemId(id: string): ItemInfo {
    const splitId = id.split("~");
    splitId.splice(0, 3);
    const readableNames = splitId.map((n) => n.split("TFT_Item_")[1]);

    return {
        itemNames: splitId,
        readableNames: readableNames,
    }
}

interface AugmentIdInfo {
    rawName: string
    readableName: string
    set: string
    patch: string
}

function getAugmentURL(id: string): string {
    const baseUrl = "https://tft-wtf-static.s3.us-west-1.amazonaws.com/tft-augment/";
    return baseUrl;
}

function parseAugmentId(id: string): AugmentIdInfo {
    // TFT<set>_Augment_{Name}~<set>~<patch>
    const [rawName, set, patch] = id.split("~");
    const splitName = rawName.split("Augment_");
    return {
        rawName,
        readableName: splitName[splitName.length - 1],
        set,
        patch,
    };
}

function formatAvg(avg: number): string {
    const fixedNum = avg.toFixed(2);
    return fixedNum.toString();
}

function formatPercent(percent: number): string {
    const fixedPercent = percent.toFixed(2);
    return `%${fixedPercent}`
}

export {
    augmentIdToName,
    unitIdToName,
    parseAugmentId,
    parseUnitId,
    parseItemId,
    formatAvg,
    formatPercent,
}
