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
  const deck = state.player.deck.map((card) => card.id);

  
  function buyCard(card: CardModel) {
    dispatch({ type: GameActionsTypes.BUY_CARD, payload:{card}});
  }
  return (
    <>
    <div className="row">
      <div className="col-12 col-lg-4">
      </div>
      <div className="col-12 col-lg-4">
        <div className="text-center">
          <button className="btn btn-primary">
          Iniciar jogo
        </button>
        </div>
      </div>
      <div className="col-12 col-lg-4">

      </div>
    </div>
    {showDeck && <div className={style.overlay}></div>}
      <div className="row mt-5">
        {Cards.filter((cardShop) => !deck.includes(cardShop.id)).map((card) =>{
          return (
            <div className="col-12 col-md-4 col-lg-3 py-3" key={card.id}>
            <CardDino type="shop" card={card} />
            <div className="text-center">
              {state.player.money >= card.cost && state.player.deck.length < state.maxCardsInDeck &&  (<Button
                type="button"
                text={`Buy: ${card.cost}`}
                className="btn btn--green mt-2"
                onClick={() =>buyCard(card)}
              />)}
            </div>
          </div>
          )
        })}
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
