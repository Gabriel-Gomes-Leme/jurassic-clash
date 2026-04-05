import type { CardModel } from "../models/CardModel"

export enum GameActionsTypes {
    SET_PLAYER_NAME = 'SET_PLAYER_NAME',
    BUY_CARD = 'BUY_CARD',
    SET_CPU_DECK = 'SET_CPU_DECK',
    RESET_DECK = 'RESET_DECK',
    REMOVE_CARD = 'REMOVE_CARD',
    START_GAME = 'START_GAME',
    PLAYER_SELECT_CARD = 'PLAYER_SELECT_CARD',
    CPU_SELECT_CARD = 'CPU_SELECT_CARD',
    START_BATTLE = 'START_BATTLE',
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
        type: GameActionsTypes.SET_CPU_DECK,
        payload: {deck: CardModel[]}
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
    | {
        type: GameActionsTypes.PLAYER_SELECT_CARD,
        payload: {card: CardModel | null}
    }
    | {
        type: GameActionsTypes.CPU_SELECT_CARD,
        payload: {card: CardModel | null}
    }
    | {
        type: GameActionsTypes.START_BATTLE,
        payload: {playerCard: CardModel | null, cpuCard: CardModel | null, turn: string}
    }