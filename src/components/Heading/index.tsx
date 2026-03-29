import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGameContext } from "../../contexts/useGameContext";
import { faDragon } from "@fortawesome/free-solid-svg-icons";
import style from "./style.module.css";
import { Container } from "../Container";

export function Heading() {
  const { state } = useGameContext();
  return (
    <header className={style.header}>
      <Container>
        <div className="d-flex justify-content-between">
            <h1 className="title-1 text-center mb-4">
          Bem vindo ao Jurassic Clash <FontAwesomeIcon icon={faDragon} />{" "}
        </h1>

        <div className={style.money}>
          <span className="money__label">Dino cash:</span>
          <span className="money__value">{state.player.money}</span>
        </div>
        </div>
      </Container>
    </header>
  );
}
