import type { GameModel } from "../models/GameModel";

export const InitialGameState : GameModel = {
    step: 'start',
    maxCardsInDeck: 4,
    player : {
        name: '',
        money: 0,
        deck: []
    }
}