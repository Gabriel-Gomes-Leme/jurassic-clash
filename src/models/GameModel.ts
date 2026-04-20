import type { PlayerModel } from "../models/PlayerModel"
import type { CardModel } from "./CardModel"

export type GameModel = {
    step: 'start' | 'shop' | 'battle' | 'end',
    maxCardsInDeck: number,
    initialMoney: number,
    initialCpuMoney: number,
    player : PlayerModel,
    avaliableCards: CardModel[],
    battle:{
        isFighting: true | false,
        playerDeck: PlayerModel['deck'],
        cpuDeck: PlayerModel['deck'],
        round: number,
        playerScore: number,
        cpuScore: number,
        winner: PlayerModel['name'] | 'cpu' | null,
        arena:{
            turn: PlayerModel['name'] | 'cpu',
            playerSelectedCard: CardModel | null,
            cpuSelectedCard: CardModel | null,
        }
    }
}