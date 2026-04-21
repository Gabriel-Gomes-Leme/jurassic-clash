import type { GameModel } from "../models/GameModel";
import type { GameActionModels } from "./GameActions";
import { InitialGameState } from "./InitialGameState";

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
      return {
        ...state,
        battle: {
          ...state.battle,
          cpuDeck: action.payload.deck,
        },
      };
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
        battle: {
          ...state.battle,
          playerDeck: state.player.deck,
          round: 1,
          arena: {
            ...state.battle.arena,
            turn: state.player.name,
          },
        },
      };
    case "PLAYER_SELECT_CARD":
      return {
        ...state,
        player: {
          ...state.player,
          deck: state.player.deck.filter(
            (card) => card.id !== action.payload.card?.id,
          ),
        },
        battle: {
          ...state.battle,
          arena: {
            ...state.battle.arena,
            turn: "cpu",
            playerSelectedCard: action.payload.card,
          },
        },
      };
    case "CPU_SELECT_CARD":
      return {
        ...state,
        player: {
          ...state.player,
        },
        battle: {
          ...state.battle,
          cpuDeck: state.battle.cpuDeck.filter(
            (card) => card.id != action.payload.card?.id,
          ),
          arena: {
            ...state.battle.arena,
            cpuSelectedCard: action.payload.card,
            turn: state.player.name,
          },
        },
      };
    case "START_BATTLE": {
      return {
        ...state,
        player: {
          ...state.player,
        },
        battle: {
          ...state.battle,
          isFighting: true,
          arena: {
            ...state.battle.arena,
            playerSelectedCard: action.payload.playerCard,
            cpuSelectedCard: action.payload.cpuCard,
            turn: action.payload.turn,
          },
        },
      };
    }
    case "APPLY_DAMAGE": {
      const cpu = state.battle.arena.cpuSelectedCard;
      const player = state.battle.arena.playerSelectedCard;

      if (!player || !cpu) {
        return state;
      }
      const cpuDamage = Math.max(0, player.attack * (1 - cpu.defense / 100));
      const playerDamage = Math.max(0, cpu.attack * (1 - player.defense / 100));

      const updateCpu = {
        ...cpu,
        hp: Math.max(0, cpu.hp - cpuDamage),
      };
      const updatePlayer = {
        ...player,
        hp: Math.max(0, player.hp - playerDamage),
      };
      const playerJustWon = cpu.hp > 0 && updateCpu.hp === 0;
      const cpuJustWon = player.hp > 0 && updatePlayer.hp === 0;
      return {
        ...state,
        player: {
          ...state.player,
        },
        battle: {
          ...state.battle,
          playerScore: state.battle.playerScore + (playerJustWon ? 1 : 0),
          cpuScore: state.battle.cpuScore + (cpuJustWon ? 1 : 0),
          arena: {
            ...state.battle.arena,
            playerSelectedCard: updatePlayer.hp > 0 ? updatePlayer : null,
            cpuSelectedCard: updateCpu.hp > 0 ? updateCpu : null,
          },
          isFighting: updateCpu.hp > 0 && updatePlayer.hp > 0 ? true : false,
        },
      };
    }
    case "FINISH_BATTLE": {
      return {
        ...state,
        step: "end",
        player: {
          ...state.player,
        },
        battle: {
          ...state.battle,
          winner: action.payload.winner,
          arena: {
            ...state.battle.arena,
          },
        },
      };
    }
    case "NEXT_STEP": {
      return {
        ...state,
        step: action.payload.step,
        player: {
          ...state.player,
        },
        battle: {
          ...state.battle,
          arena: {
            ...state.battle.arena,
          },
        },
      };
    }
    case "RESET_GAME": {
      return InitialGameState;
    }
  }

  return state;
}
