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
      if (
        state.player.money < action.payload.card.cost ||
        state.player.deck.length >= state.maxCardsInDeck
      ) {
        return state;
      }

      return {
        ...state,
        player: {
          ...state.player,
          money: state.player.money - action.payload.card.cost,
          deck: [...state.player.deck, action.payload.card],
        },
      };
    case "SET_CPU_DECK":
      return{
        ...state,
        battle:{
          ...state.battle,
          cpuDeck: action.payload.deck
        }
      }
    case "REMOVE_CARD":
      return {
        ...state,
        player: {
          ...state.player,
          money: state.player.money + action.payload.card.cost,
          deck: state.player.deck.filter(
            (card) => card.id != action.payload.card.id,
          ),
        },
      };
    case "RESET_DECK":
      return {
        ...state,
        player: {
          ...state.player,
          money: state.initialMoney,
          deck: [],
        },
      };
    case "START_GAME":
      return {
        ...state,
        step: "battle",
        battle:{
          ...state.battle,
          playerDeck: state.player.deck,
          round: 1,
          turn: state.player.name,
        }
      };
    case "PLAYER_SELECT_CARD":
      return{
        ...state,
        player:{
          ...state.player,
          deck: state.player.deck.filter((card) => card.id !== action.payload.card.id)
        },
        battle:{
          ...state.battle,
          arena:{
            ...state.battle.arena,
            playerSelectedCard: action.payload.card
          },
          turn: 'cpu'
        }
      };
    case "CPU_SELECT_CARD":
      return{
        ...state,
        player:{
          ...state.player
        },
        battle:{
          ...state.battle,
          cpuDeck: state.battle.cpuDeck.filter((card) => card.id != action.payload.card.id),
          arena:{
            ...state.battle.arena,
            cpuSelectedCard: action.payload.card
          }
        }
      }
  }

  return state;
}
