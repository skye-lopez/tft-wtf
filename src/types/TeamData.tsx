interface Augment {
    id: string
    places: number[]
    sample: number
    avg: number
    top1: number
    top2: number
    top3: number
    top4: number
}

interface Team {
    id: string
    unit_ids: string[]
    places: number[]
    sample: number
    avg: number
    top1: number
    top2: number
    top3: number
    top4: number
}

interface UnitItem {
    id: string
    places: number[]
    sample: number
    avg: number
    top1: number
    top2: number
    top3: number
    top4: number
}

interface Unit {
    id: string
    items: UnitItem[]
    places: number[]
    sample: number
    avg: number
    top1: number
    top2: number
    top3: number
    top4: number
}

export default interface TeamData {
    augments: Augment[]
    teams: Team[]
    units: Unit[]
    sample: number
}
