import { createContext } from "react"
import type { GameModel } from "../models/GameModel"
import type { GameActionModels } from "./GameActions"
import { InitialGameState } from "./InitialGameState"

type GameContextProps ={
  state: GameModel,
  dispatch: React.Dispatch<GameActionModels>
}

const initialContextValue : GameContextProps ={
  state: InitialGameState,
  dispatch: () => {}
}

export const GameContext = createContext(initialContextValue)