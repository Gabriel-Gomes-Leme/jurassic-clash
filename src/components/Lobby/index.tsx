import { useState } from "react";
import { useGameContext } from "../../contexts/useGameContext";
import { Button } from "../Button";
import { PlayerDeck } from "../PlayerDeck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

import style from "./style.module.css";
import { Modal } from "../Modal";
import { Shop } from "../Shop";
import { GameActionsTypes } from "../../contexts/GameActions";

type modalType = "deck" | "shop" | "";

export function Lobby() {
  const { state, dispatch } = useGameContext();
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState<modalType>("");
  

  function handleModal(type: modalType) {
    setTypeModal(type);
    setShowModal(!showModal)
  }
    function handleStartGame() {
    dispatch({ type: GameActionsTypes.START_GAME });
  }


  return (
    <>
      <div className="row">
        <div className="col-12 col-lg-4"></div>
        <div className="col-12 col-lg-4">
          <div className="text-center">
            {state.player.deck.length > state.maxCardsInDeck - 1 && (
            <Button title="Iniciar jogo" ariaLabel="Iniciar jogo" type="button" onClick={() => handleStartGame()} className="btn btn-primary my-3">
              Iniciar Jogo
            </Button>
            )}
            <Button title="Comprar carta" ariaLabel="Comprar carta" type="button" onClick={() => handleModal("shop")} className="btn btn-shop my-3">
              <FontAwesomeIcon icon={faCartPlus} /> Loja de Cartas
            </Button>
            <Button title="Mostrar deck" ariaLabel="Mostrar deck" type="button" onClick={() => handleModal("deck")} className="btn btn-light my-3">
               Deck <span className={style.deckCount}>
          {state.player.deck.length} / {state.maxCardsInDeck}
        </span>
            </Button>
          </div>
        </div>
        <div className="col-12 col-lg-4"></div>
      </div>
      {showModal && typeModal == "shop" && <Modal closeModal={() => setShowModal(false)}> <Shop /></Modal>}
      {showModal && typeModal == "deck" &&  <Modal closeModal={() => setShowModal(false)}><PlayerDeck /></Modal>}


      {showModal && <div className={style.overlay}></div>}

    </>
  );
}
