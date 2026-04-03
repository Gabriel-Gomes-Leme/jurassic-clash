import type { GameModel } from "../models/GameModel";

export const InitialGameState : GameModel = {
    step: 'start',
    maxCardsInDeck: 4,
    initialMoney: 290,
    player : {
        name: '',
        money: 290,
        deck: []
    }
}