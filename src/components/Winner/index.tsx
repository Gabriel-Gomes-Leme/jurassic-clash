import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GameActionsTypes } from "../../contexts/GameActions";
import { useGameContext } from "../../contexts/useGameContext";
import { Button } from "../Button";
import style from "./style.module.css";
import { faCoins, faFaceSadCry, faMedal } from "@fortawesome/free-solid-svg-icons";
import dinoSad from '../../../public/sad-dino.webp';
import dinoHappy from '../../../public/happy-dino.webp';

export function Winner() {
  const { state, dispatch } = useGameContext();
  const bonus = 60;
  function handleFinish(step: "shop") {
    dispatch({ type: GameActionsTypes.NEXT_STEP, payload: { step: step } });
  }
  return (
    <div
      className={style.winner}
      style={{
        background: state.battle.winner == "cpu" ? "#fe7f7f" : "#5fd677",
      }}
    >
      {state.battle.winner == "cpu" && (
        <>
        <div className="d-flex justify-content-center">
          <img src={dinoSad} alt="Dinossauro derrotado" title="Dinossauro derrotado" className={style.dinoImg}/>
        </div>
        <h2 className="text-center light my-3">
          Você perdeu <FontAwesomeIcon icon={faFaceSadCry}></FontAwesomeIcon>
        </h2>
        </>
      )}
      {state.battle.winner == state.player.name && (
        <>
        <div className="d-flex justify-content-center">
          <img src={dinoHappy} alt="Dinossauro Vencedor" title="Dinossauro Vencedor" className={style.dinoImg}/>
        </div>
        <h2 className="text-center light my-3">
          Você Venceu <FontAwesomeIcon icon={faMedal}></FontAwesomeIcon>
        </h2>
        </>
      )}
      {state.battle.winner == state.player.name && (
        <div className="text-center my-3">
          <span className={style.bonus}>
            Você ganhou: <FontAwesomeIcon icon={faCoins}></FontAwesomeIcon>{" "}
            {bonus}
          </span>
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
