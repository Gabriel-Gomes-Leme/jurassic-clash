import type { PlayerModel } from "../models/PlayerModel"
import type { CardModel } from "./CardModel"

export type GameModel = {
    step: 'start' | 'shop' | 'battle' | 'end',
    maxCardsInDeck: number,
    initialMoney: number,
    player : PlayerModel,
    avaliableCards: CardModel[],
    battle:{
        playerDeck: PlayerModel['deck'],
        cpuDeck: PlayerModel['deck'],
        round: number,
        playerScore: number,
        cpuScore: number,
        arena:{
            turn: PlayerModel['name'] | 'cpu',
            playerSelectedCard: CardModel | null,
            cpuSelectedCard: CardModel | null,
        }
    }
}