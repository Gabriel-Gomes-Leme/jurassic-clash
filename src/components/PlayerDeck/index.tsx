import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGameContext } from "../../contexts/useGameContext";
import { CardDino } from "../CardDino";
import style from "./style.module.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import type { CardModel } from "../../models/CardModel";
import { GameActionsTypes } from "../../contexts/GameActions";

type PlayerDeckProps = {
  closeDeck: () => void;
};

export function PlayerDeck({ closeDeck }: PlayerDeckProps) {
  const { state, dispatch } = useGameContext();

  function handleRemoveCard(card: CardModel) {
    console.log(card.name);
    dispatch({ type: GameActionsTypes.REMOVE_CARD, payload: { card } });
  }
  function handleStartGame() {
    dispatch({ type: GameActionsTypes.START_GAME });
  }
  function handleResetDeck() {
    dispatch({type: GameActionsTypes.RESET_DECK})
  }
  return (
    <div className={style.playerDeck}>
      <button className={style.closeButton} onClick={closeDeck}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <h2 className="light playerDeckTitle">🦖 Deck de: {state.player.name}</h2>
      <div className={style.deckBody}>
        <div className="row">
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
      </div>
      <div className="d-flex align-items-center">
        <button className="btn btn--green me-2" onClick={() => handleStartGame()}>
          Iniciar Jogo
        </button>
        <button className="btn btn--red" onClick={() => handleResetDeck()}>
          Reiniciar Deck
        </button>
      </div>
    </div>
  );
}
