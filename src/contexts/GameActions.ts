import type { CardModel } from "../models/CardModel"

export enum GameActionsTypes {
    SET_PLAYER_NAME = 'SET_PLAYER_NAME',
    BUY_CARD = 'BUY_CARD',
    RESET_DECK = 'RESET_DECK',
    REMOVE_CARD = 'REMOVE_CARD',
    START_GAME = 'START_GAME',
}

export type GameActionModels = |{
        type: GameActionsTypes.SET_PLAYER_NAME,
        payload: {name: string, money: number}
    }
    | {
        type: GameActionsTypes.BUY_CARD,
        payload: {card: CardModel}
    }
    | {
        type: GameActionsTypes.REMOVE_CARD,
        payload: {card: CardModel}
    }
    | {
        type: GameActionsTypes.RESET_DECK
    }
    | {
        type: GameActionsTypes.START_GAME
    }