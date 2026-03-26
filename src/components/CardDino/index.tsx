import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { CardModel } from "../../models/CardModel";
import styles from "./style.module.css";
import { faBolt, faShield } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart";

type cardProps = {
  card: CardModel;
};

const borderColors = {
  common: "#49c26f",
  rare: "#41a6e0",
  epic: '#8452c1',
  legendary: "#e7be36",
};

export function CardDino({ card }: cardProps) {
  return (
    <div className={styles.cardDino} style={{border: `6px solid ${borderColors[card.rarity]}`}} key={card.id}>
      <img
        src={card.image}
        alt={card.name}
        title={card.name}
        className={styles.cardImage}
      />
      <div className={styles.cardBody}>
        <h2 className="card__title fw-bold" style={{color: borderColors[card.rarity]}}>{card.name}</h2>
        <p className="card__description">{card.description}</p>
      </div>
      <div className={styles.cardStats}>
        <span title="Ataque" className={styles.cardStat} style={{ "--background": "#970000" } as React.CSSProperties}><FontAwesomeIcon
            aria-label="Ataque"
            icon={faBolt}
          ></FontAwesomeIcon> {card.attack}</span>
        <span title="Vida" className={styles.cardStat} style={{ "--background": "#49c26f" } as React.CSSProperties}>
          <FontAwesomeIcon
            aria-label="Vida"
            icon={faHeart}
          ></FontAwesomeIcon> {card.hp}</span>
        <span aria-label="Defesa" title="Defesa" className={styles.cardStat} style={{ "--background": "#41a6e0" } as React.CSSProperties}>
          <FontAwesomeIcon
            aria-label="Defesa"
            icon={faShield}
          ></FontAwesomeIcon>
          {card.defense}
        </span>
      </div>
    </div>
  );
}
