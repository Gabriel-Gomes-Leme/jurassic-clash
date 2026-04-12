import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDragon } from "@fortawesome/free-solid-svg-icons";
import style from "./style.module.css";

export function Heading() {
  return (
    <header className={style.header}>

        <div className="d-flex justify-content-center flex-column">
            <h1 className="title-1 text-center my-0">
          Bem vindo ao Jurassic Clash <FontAwesomeIcon icon={faDragon} />{" "}
        </h1>
        </div>
    </header>
  );
}
