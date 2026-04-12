import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { CardModel } from "../../models/CardModel";
import style from "./style.module.css";
import { faBolt, faInfo, faPhotoFilm, faShield } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart";
import { useState } from "react";

type cardProps = {
  card: CardModel;
  type?: "cardArena" | "shop" | "battle";
};

const borderColors = {
  common: "#49c26f",
  rare: "#41a6e0",
  epic: "#8452c1",
  legendary: "#e7be36",
};

const titleSize = {
  cardArena: "0.9rem",
  shop: "1.2rem",
  battle: "0.9rem"
};

const customStyle = {
  battle: style.cardBattle,
  shop: style.cardShop,
  cardArena: style.cardArena
}

export function CardDino({ card, type }: cardProps) {
  const [fliped, setFliped] = useState(false);
  return (
    <div
      aria-label={card.name}
      title={card.name}
      className={`${style.cardDino} ${fliped ? style.fliped : ""} ${type && customStyle[type]}`}
      key={card.id}
    >
      <span className={style.cardIconInfo} onClick={() => setFliped(!fliped)}>
        <FontAwesomeIcon icon={!fliped ? faInfo : faPhotoFilm}></FontAwesomeIcon>
      </span>
      <div
        className={`${style.cardFace} ${style.cardFront}`}
        style={{
          border: `6px solid ${borderColors[card.rarity]}`,
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5) 51%, rgba(0,0,0,1) 96%), url(${card.image})`,
        }}
      >
        <h2
          className="card__title fw-bold"
          style={{
            color: borderColors[card.rarity],
            fontSize: type && titleSize[type],
          }}
        >
          {card.name}
        </h2>
        <div className={style.cardStats}>
          <span
            title="Ataque"
            className={style.cardStat}
            style={{ "--color": "#af0b0b" } as React.CSSProperties}
          >
            <FontAwesomeIcon
              aria-label="Ataque"
              icon={faBolt}
            ></FontAwesomeIcon>{" "}
            {card.attack}
          </span>
          <span
            title="Vida"
            className={style.cardStat}
            style={{ "--color": "#49c26f" } as React.CSSProperties}
          >
            <FontAwesomeIcon aria-label="Vida" icon={faHeart}></FontAwesomeIcon>{" "}
            {card.maxHp}
          </span>
          <span
            aria-label="Defesa"
            title="Defesa"
            className={style.cardStat}
            style={{ "--color": "#41a6e0" } as React.CSSProperties}
          >
            <FontAwesomeIcon
              aria-label="Defesa"
              icon={faShield}
            ></FontAwesomeIcon>
             {card.defense}
          </span>
        </div>
      </div>
      <div
        className={`${style.cardFace} ${style.cardBack}`}
        style={{ border: `6px solid ${borderColors[card.rarity]}` }}
      >
        {card.description != "" && (
          <p className="card__description text-center fs-18">
            {card.description}
          </p>
        )}
      </div>
    </div>
  );
}
