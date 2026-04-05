export type DinoType = 'carnivore' | 'herbivore' | 'omnivore'
export enum Rarity {
    COMMON = 'common',
    RARE = 'rare',
    EPIC = 'epic',
    LEGENDARY = 'legendary'
}

export type CardModel={
    id: number,
    name: string,
    image: string,
    attack: number,
    defense: number,
    type: DinoType,
    maxHp: number,
    hp: number,
    cost: number,
    rarity: Rarity,
    description: string
}