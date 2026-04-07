import { useGameContext } from "../../contexts/useGameContext";
import style from "./style.module.css";

export function Winner() {
  const { state } = useGameContext();
  return (
    <div className={style.winner}>
      <h2 className="text-center primary-color">
        {state.battle.winner} Venceu !
      </h2>
    </div>
  );
}