import type { GameModel } from "../models/GameModel";
import { Cards } from "./Cards";

export const InitialGameState : GameModel = {
    step: 'start',
    maxCardsInDeck: 4,
    initialMoney: 290,
    avaliableCards: Cards,
    player : {
        name: '',
        money: 290,
        deck: []
    },
    battle:{
        playerDeck: [],
        cpuDeck: [],
        round: 0,
        playerScore: 0,
        cpuScore: 0,
        winner: null,
        arena:{
            turn: 'player',
            playerSelectedCard: null,
            cpuSelectedCard: null
        }
    }
}