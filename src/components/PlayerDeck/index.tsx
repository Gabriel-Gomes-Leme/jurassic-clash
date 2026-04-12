import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGameContext } from "../../contexts/useGameContext";
import { CardDino } from "../CardDino";
import style from "./style.module.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import type { CardModel } from "../../models/CardModel";
import { GameActionsTypes } from "../../contexts/GameActions";

export function PlayerDeck() {
  const { state, dispatch } = useGameContext();

  function handleRemoveCard(card: CardModel) {
    console.log(card.name);
    dispatch({ type: GameActionsTypes.REMOVE_CARD, payload: { card } });
  }
  function handleResetDeck() {
    dispatch({ type: GameActionsTypes.RESET_DECK });
  }
  return (
    <div className={style.playerDeck}>
      <h2 className="light text-center playerDeckTitle">
        🦖 Deck de: {state.player.name}
      </h2>
      <div className="row my-5">
        {state.player.deck.length > 0 &&
          state.player.deck.map((card) => {
            return (
              <div
                className="col-12 col-md-4 col-lg-3 py-2 px-1 position-relative"
                key={card.id}
              >
                <button
                  type="button"
                  aria-label="Remover carta"
                  title="Remover carta"
                  className={style.removeCard}
                  onClick={() => handleRemoveCard(card)}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
                <CardDino type="player" card={card} />
              </div>
            );
          })}
      </div>

      <div className="d-flex justify-content-center align-items-center my-3">
        {state.player.deck.length > 0 && (
          <button
            aria-label="Resetar Deck"
            title="Resetar Deck"
            className="btn btn--red"
            onClick={() => handleResetDeck()}
          >
            Resetar Deck
          </button>
        )}
      </div>
    </div>
  );
}
