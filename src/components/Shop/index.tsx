import { useState } from "react";
import { Cards } from "../../contexts/Cards";
import { GameActionsTypes } from "../../contexts/GameActions";
import { useGameContext } from "../../contexts/useGameContext";
import type { CardModel } from "../../models/CardModel";
import { Button } from "../Button";
import { CardDino } from "../CardDino";
import { PlayerDeck } from "../PlayerDeck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faLayerGroup } from "@fortawesome/free-solid-svg-icons";

import style from "./style.module.css";

export function Shop() {
  const { state, dispatch } = useGameContext();
  const [showDeck, setShowDeck] = useState(false);

  console.log(state)
  
  function buyCard(card: CardModel) {
    dispatch({ type: GameActionsTypes.BUY_CARD, payload:{card}});
  }
  return (
    <>
    <h2 className="light">Olá {state.player.name}!</h2>
      <div className="row mt-5">
        {Cards.map((card) => (
          <div className="col-12 col-md-4 py-3" key={card.id}>
            <CardDino type="shop" card={card} />
            <div className="text-center">
              {state.player.money >= card.cost && state.player.deck.length < state.maxCardsInDeck &&  (<Button
                type="button"
                text={`Comprar carta: ${card.cost}`}
                className="btn btn--green mt-2"
                onClick={() =>buyCard(card)}
              />)}
            </div>
          </div>
        ))}
      </div>
      <button className={style.showDeckButton} onClick={() => setShowDeck(!showDeck)}
      aria-label="Mostrar deck"
        title="Mostrar deck">
        <FontAwesomeIcon icon={faLayerGroup} />
        <span className={style.deckCount}>
          {state.player.deck.length} / {state.maxCardsInDeck}
        </span>
      </button>

      {showDeck && <PlayerDeck closeDeck={() => setShowDeck(false)} />}
    </>
  );
}
