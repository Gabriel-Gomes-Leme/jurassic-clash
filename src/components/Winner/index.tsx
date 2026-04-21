
import { GameActionsTypes } from "../../contexts/GameActions";
import { useGameContext } from "../../contexts/useGameContext";
import { Button } from "../Button";
import style from "./style.module.css";

export function Winner() {
  const { state, dispatch } = useGameContext();
  const bonus = 60
  function handleFinish(step: "shop") {
    dispatch({ type: GameActionsTypes.NEXT_STEP, payload: { step: step } });
  }
  return (
    <div className={style.winner}>
      <h2 className="text-center primary-color">
        {state.battle.winner} Venceu !
      </h2>
      {state.battle.winner == state.player.name && (
        <div className="text-center">
          <span className={style.bonus}>Você ganhou: {bonus}</span>
        </div>
      )}
      <div className="d-flex justify-content-center">
        <Button
          type="button"
          ariaLabel="Voltar para a tela inicial"
          title="Voltar para a tela inicial"
          className="btn btn-game my-3"
          style={
            {
              "--background": "linear-gradient(145deg, #535f73, #53525c)",
            } as React.CSSProperties
          }
          onClick={() => handleFinish("shop")}
        >
          Voltar para a tela inicial
        </Button>
      </div>
    </div>
  );
}
