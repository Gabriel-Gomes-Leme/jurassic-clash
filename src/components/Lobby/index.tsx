import { useState } from "react";
import { useGameContext } from "../../contexts/useGameContext";
import { Button } from "../Button";
import { PlayerDeck } from "../PlayerDeck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCartPlus, faLayerGroup, faPlay, faTrash } from "@fortawesome/free-solid-svg-icons";

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
    setShowModal(!showModal);
  }
  function handleStartGame() {
    dispatch({ type: GameActionsTypes.START_GAME });
  }
  function resetGame(){
    dispatch({type: GameActionsTypes.RESET_GAME})
  }

  return (
    <>
      <div className="row">
        <div className="col-12 col-lg-4"></div>
        <div className="col-12 col-lg-4">
          <div className={`${style.menuLobby} text-center d-flex flex-column align-items-center`}>
            {state.player.deck.length > state.maxCardsInDeck - 1 && (
              <Button
                title="Iniciar jogo"
                ariaLabel="Iniciar jogo"
                type="button"
                onClick={() => handleStartGame()}
                className="btn btn-game my-3 d-block"
                style={
                  {
                    "--background": "linear-gradient(145deg, #0765e9, #0765e9)",
                  } as React.CSSProperties
                }
              >
                <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon> Iniciar Jogo
              </Button>
            )}
            <Button
              title="Comprar carta"
              ariaLabel="Comprar carta"
              type="button"
              onClick={() => handleModal("shop")}
              className="btn btn-game my-3 d-block"
              style={
                {
                  "--background": "linear-gradient(145deg, #1e6b3a, #0f3d22)",
                } as React.CSSProperties
              }
            >
              <FontAwesomeIcon icon={faCartPlus} /> Loja de Cartas
            </Button>
            <Button
              title="Mostrar deck"
              ariaLabel="Mostrar deck"
              type="button"
              onClick={() => handleModal("deck")}
              className="btn btn-game my-3 d-block"
              style={
                {
                  "--background": "linear-gradient(145deg, var(--tertiary-color-dark), var(--tertiary-color-medium))",
                } as React.CSSProperties
              }
            >
              <FontAwesomeIcon icon={faLayerGroup}></FontAwesomeIcon> Deck
              <span className={style.deckCount}>
                {state.player.deck.length} / {state.maxCardsInDeck}
              </span>
            </Button>
            <Button
              title="Excluir usuário"
              ariaLabel="Excluir usuário"
              type="button"
              onClick={() => resetGame()}
              className="btn btn-game my-3 d-block"
              style={
                {
                  "--background": "linear-gradient(145deg, #a50404, #a50404)",
                } as React.CSSProperties
              }
            >
             <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> Excluir usuário
            </Button>
          </div>
        </div>
        <div className="col-12 col-lg-4"></div>
      </div>
      {showModal && typeModal == "shop" && (
        <Modal closeModal={() => setShowModal(false)}>
          {" "}
          <Shop />
        </Modal>
      )}
      {showModal && typeModal == "deck" && (
        <Modal closeModal={() => setShowModal(false)}>
          <PlayerDeck />
        </Modal>
      )}

      {showModal && <div className={style.overlay}></div>}
    </>
  );
}
