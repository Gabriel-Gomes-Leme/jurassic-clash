import { useEffect, useReducer } from "react";
import { InitialGameState } from "./InitialGameState";
import { GameReducer } from "./GameReducer";
import { GameContext } from "./GameContext";

type GameContextProviderProps = {
  children: React.ReactNode;
};

export function GameContextProvider({ children }: GameContextProviderProps) {
  const [state, dispatch] = useReducer(
    GameReducer,
    InitialGameState,
    (initial) => {
      const saved = localStorage.getItem("gameState");

      if (!saved) return initial;

      try {
        const parsed = JSON.parse(saved);

        return {
          ...parsed,
        };
      } catch {
        return initial;
      }
    },
  );
  useEffect(() => {
    localStorage.setItem("gameState", JSON.stringify(state));
  }, [state]);
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}
