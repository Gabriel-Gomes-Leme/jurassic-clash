import type { GameModel } from "../models/GameModel";
import { Cards } from "./Cards";

export const InitialGameState : GameModel = {
    step: 'start',
    maxCardsInDeck: 4,
    initialMoney: 320,
    initialCpuMoney: 380,
    avaliableCards: Cards,
    player : {
        name: '',
        money: 320,
        deck: []
    },
    battle:{
        playerDeck: [],
        cpuDeck: [],
        round: 0,
        playerScore: 0,
        cpuScore: 0,
        winner: null,
        isFighting: false,
        arena:{
            turn: 'player',
            playerSelectedCard: null,
            cpuSelectedCard: null
        }
    }
}