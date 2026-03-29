import type { CardModel } from "../models/CardModel"

export enum GameActionsTypes {
    SET_PLAYER_NAME = 'SET_PLAYER_NAME',
    BUY_CARD = 'BUY_CARD',
    REMOVE_CARD = 'REMOVE_CARD',
    NEXT_STEP = 'NEXT_STEP',
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
        type: GameActionsTypes.NEXT_STEP,
        payload: undefined
    }