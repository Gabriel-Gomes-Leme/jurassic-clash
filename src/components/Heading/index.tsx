import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDragon } from "@fortawesome/free-solid-svg-icons";
import style from "./style.module.css";
import { Container } from "../Container";

export function Heading() {
  return (
    <header className={style.header}>
      <Container>
        <div className="d-flex justify-content-between">
            <h1 className="title-1 text-center my-0">
          Bem vindo ao Jurassic Clash <FontAwesomeIcon icon={faDragon} />{" "}
        </h1>
        </div>
      </Container>
    </header>
  );
}
