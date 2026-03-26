import type { GameModel } from "../models/GameModel";
import type { GameActionModels } from "./GameActions";

export function GameReducer(state: GameModel, action : GameActionModels) : GameModel {
    console.log(action.type)
    switch (action.type){
        case 'SET_PLAYER_NAME':
            return{
                ...state,
                player:{
                    ...state.player,
                    name: action.payload.name
                }
            }
    }
    return state
}