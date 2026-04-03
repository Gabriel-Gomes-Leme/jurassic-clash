import type { GameModel } from "../models/GameModel";
import type { GameActionModels } from "./GameActions";

export function GameReducer(
  state: GameModel,
  action: GameActionModels,
): GameModel {
  console.log(action.type);
  switch (action.type) {
    case "SET_PLAYER_NAME":
      return {
        ...state,
        step: "shop",
        player: {
          ...state.player,
          name: action.payload.name,
          money: action.payload.money,
        },
      };
    case "BUY_CARD":
      return {
        ...state,
        player:{
          ...state.player,
          money: state.player.money - action.payload.card.cost,
          deck:[...state.player.deck, action.payload.card]
        }
      };
      case "REMOVE_CARD":
      return {
        ...state,
        player:{
          ...state.player,
          money: state.player.money + action.payload.card.cost,
          deck: state.player.deck.filter((card) => card.id != action.payload.card.id)
        }
      };
      case "RESET_DECK":
        return{
          ...state,
          player:{
            ...state.player,
            money: 340,
            deck: []
          }
        }
      case "START_GAME":
      return {
        ...state,
        step: "battle"
      };
  };
  

  return state;
}
