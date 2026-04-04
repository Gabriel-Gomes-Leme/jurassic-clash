import { useEffect } from "react";
import { useGameContext } from "../../contexts/useGameContext";
import { CardDino } from "../CardDino";
import style from "./style.module.css";
import { GameActionsTypes } from "../../contexts/GameActions";
import type { CardModel } from "../../models/CardModel";

export function Battle() {
  const { state, dispatch } = useGameContext();

  const avaliableCards = state.avaliableCards;

  function generateCpuDeck(avaliableCards: CardModel[], maxCards: number) {
    const shuffled = [...avaliableCards].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, maxCards);
  }

  function handleCpuDeck(maxCards: number) {
    if (state.battle.cpuDeck.length === 0) {
      const cpuDeck = generateCpuDeck(avaliableCards, maxCards);
      dispatch({
        type: GameActionsTypes.SET_CPU_DECK,
        payload: { deck: cpuDeck },
      });
    }
  }

  function handleSelectCard(card: CardModel) {
    console.log('Player selected card:', card);
    dispatch({type: GameActionsTypes.PLAYER_SELECT_CARD, payload: {card}})

    setTimeout(() => {
        const cpuCard = state.battle.cpuDeck[Math.floor(Math.random() * state.battle.cpuDeck.length)];
        dispatch({type: GameActionsTypes.CPU_SELECT_CARD, payload: {card: cpuCard}})
    }, 2000)
  }

  useEffect(() => {
    handleCpuDeck(state.maxCardsInDeck);
  }, []);

  return (
    <>
      <div className="battle">
        <h2 className="light text-center"> Campo de batalha</h2>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 col-md-4">
          <div className={style.battleDeck}>
            <h2 className="light">{state.player.name} Deck</h2>
            <div className="row">
              {state.player.deck.map((card, index) => {
                return (
                  <div className="col-12 col-md-6 py-2 m-0">
                    <div onClick={() => handleSelectCard(card)}>
                        <CardDino card={card} type="player" key={index}/>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
            <h2 className="light text-center">
              {state.battle.turn} turn
            </h2>
            <div className="battleCamp">
                <div className="playerCard">
                    {state.battle.arena.playerSelectedCard ? (
                        <CardDino card={state.battle.arena.playerSelectedCard} type="player" />
                    ) : (
                        <div className="emptyCard">Selecione uma carta</div>
                    )}
                </div>
                <h2 className="light text-center my-5">VS</h2>
                <div className="cpuCard">
                    {state.battle.arena.cpuSelectedCard ? (
                        <CardDino card={state.battle.arena.cpuSelectedCard} type="player" />
                    ) : (
                        <div className="emptyCard">Aguardando CPU</div>
                    )}
                </div>
            </div>
        </div>
        <div className="col-12 col-md-4">
          <div className={style.battleDeck}>
            <h2 className="light">CPU Deck</h2>
          <div className="row">
            {state.battle.cpuDeck.map((card, index) => {
              return (
                <div className="col-12 col-md-6 py-2 m-0">
                  <CardDino card={card} type="player" key={index} />;
                </div>
              );
            })}
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
