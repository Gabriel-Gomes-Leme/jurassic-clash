import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGameContext } from "../../contexts/useGameContext";
import style from "./style.module.css";
import { faCoins } from "@fortawesome/free-solid-svg-icons";

export function DinoCash() {
    const {state} = useGameContext()
  return (
    <div className={style.money} aria-label="Dino Cash" title="Dino Cash">
      <span className={`${style.moneyLabel} me-2`}><FontAwesomeIcon icon={faCoins} /></span> 
      <span className={style.moneyValue}>{state.player.money}</span>
    </div>
  );
}
