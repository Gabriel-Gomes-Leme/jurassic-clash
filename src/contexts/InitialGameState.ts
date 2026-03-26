import type { GameModel } from "../models/GameModel";

export const InitialGameState : GameModel = {
    step: 'start',
    player : {
        name: '',
        money: 260,
        deck: []
    }
}