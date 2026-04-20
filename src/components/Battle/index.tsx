import { useEffect, useRef } from "react";
import { useGameContext } from "../../contexts/useGameContext";
import { CardDino } from "../CardDino";
import style from "./style.module.css";
import "./style.module.css";
import { GameActionsTypes } from "../../contexts/GameActions";
import type { CardModel } from "../../models/CardModel";

export function Battle() {
  const { state, dispatch } = useGameContext();

  const avaliableCards = state.avaliableCards;

  const cpuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  function handleCpuSelectCard() {
    if (!state.battle.arena.cpuSelectedCard && !cpuTimeoutRef.current) {
      cpuTimeoutRef.current = setTimeout(() => {
        const cpuCard =
          state.battle.cpuDeck[
            Math.floor(Math.random() * state.battle.cpuDeck.length)
          ];
        dispatch({
          type: GameActionsTypes.CPU_SELECT_CARD,
          payload: { card: cpuCard },
        });

        cpuTimeoutRef.current = null;
      }, 2000);
    }
  }

  function handlePlayerSelectCard(card: CardModel) {
    if (
      state.battle.arena.playerSelectedCard &&
      state.battle.arena.cpuSelectedCard
    ) {
      return;
    }
    if (
      !state.battle.arena.playerSelectedCard &&
      state.battle.arena.turn === state.player.name
    ) {
      dispatch({
        type: GameActionsTypes.PLAYER_SELECT_CARD,
        payload: { card },
      });
    }

    if (!state.battle.arena.cpuSelectedCard) {
      handleCpuSelectCard();
    }
  }

  function handleStartFight(
    playerCard: CardModel | null,
    cpuCard: CardModel | null,
  ) {
    if (playerCard && cpuCard) {
      dispatch({
        type: GameActionsTypes.START_BATTLE,
        payload: { playerCard, cpuCard, turn: state.player.name },
      });
    }
  }

  function handleWinner(winner: string) {
    dispatch({
      type: GameActionsTypes.FINISH_BATTLE,
      payload: { winner: winner },
    });
  }

  // watcher para a cpu selecionar carta
  useEffect(() => {
    if (
      !state.battle.arena.cpuSelectedCard &&
      state.battle.cpuDeck.length > 0
    ) {
      handleCpuSelectCard();
    }
  }, [
    state.battle.arena.cpuSelectedCard,
    state.battle.cpuDeck.length,
  ]);

  // watcher para criar o deck da cpu

  useEffect(() => {
    handleCpuDeck(state.maxCardsInDeck);
  }, []);

  // watcher para o combate
  useEffect(() => {
    if (
      !state.battle.isFighting ||
      !state.battle.arena.playerSelectedCard ||
      !state.battle.arena.cpuSelectedCard
    )
      return;

    if (
      state.battle.arena.cpuSelectedCard &&
      state.battle.arena.playerSelectedCard &&
      state.battle.isFighting
    ) {
      const interval = setInterval(() => {
        dispatch({ type: GameActionsTypes.APPLY_DAMAGE });
      }, 1000); // 1 segundo por ataque
      return () => clearInterval(interval);
    }

  }, [state.battle.isFighting]);

  // watcher para definir o vencedor
  useEffect(() => {
    if (state.battle.winner) {
      return;
    }
    if (state.battle.cpuScore >= 4) {
      handleWinner("cpu");
    }
    if (state.battle.playerScore >= 4) {
      handleWinner(state.player.name);
    }
  }, [state.battle.cpuScore, state.battle.playerScore, state.battle.winner]);

  return (
    <>
      <div className={`py-5 ${style.battleCamp}`}>
        <div className="d-flex justify-content-end">
          <div className={style.cpuDeck}>
            <h2 className="light fs-14">CPU Deck</h2>
            <div className="row">
              {state.battle.cpuDeck.map((card, index) => {
                return (
                  <div className="col-6 col-md-3 py-2 m-0">
                    <CardDino card={card} type="cpuDeck" key={index} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <h2 className="light text-center title=primary">
          {state.battle.arena.turn} turn
        </h2>

        <div className="row justify-content-center battleCamp">
          <div className="col-12 col-md-4">
            <div className={style.cardSelected}>
              {state.battle.arena.playerSelectedCard ? (
                <>
                  <CardDino
                    card={state.battle.arena.playerSelectedCard}
                    type="cardArena"
                  />
                  <div className={style.cardLife}>
                    <div
                      className={style.cardLifeBar}
                      style={{
                        height: `${(state.battle.arena.playerSelectedCard.hp / state.battle.arena.playerSelectedCard.maxHp) * 100}%`,
                      }}
                    ></div>
                  </div>
                </>
              ) : (
                <div className="emptyCard text-center light">
                  Selecione uma carta
                </div>
              )}
            </div>
          </div>
          <div className="col-12 col-md-2">
            <h2 className="light text-center my-5">VS</h2>
            {state.battle.arena.playerSelectedCard &&
              state.battle.arena.cpuSelectedCard && !state.battle.isFighting && (
                <div className="row mt-3">
                  <div className="col-12 text-center">
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        handleStartFight(
                          state.battle.arena.playerSelectedCard,
                          state.battle.arena.cpuSelectedCard,
                        )
                      }
                    >
                      Iniciar Batalha
                    </button>
                  </div>
                </div>
              )}
          </div>
          <div className="col-12 col-md-4">
            <div className={style.cardSelected}>
              {state.battle.arena.cpuSelectedCard ? (
                <>
                  <CardDino
                    card={state.battle.arena.cpuSelectedCard}
                    type="cardArena"
                  />
                  <div className={style.cardLife}>
                    <div
                      className={style.cardLifeBar}
                      style={{
                        height: `${(state.battle.arena.cpuSelectedCard.hp / state.battle.arena.cpuSelectedCard.maxHp) * 100}%`,
                      }}
                    ></div>
                  </div>
                </>
              ) : (
                <div className="emptyCard text-center light">
                  Aguardando CPU
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={style.battleDeck}>
        <h2 className="light">{state.player.name} Deck</h2>
        <div className="row">
          {state.player.deck.map((card, index) => {
            return (
              <div className="col-12 col-md-3 py-2 m-0">
                <div onClick={() => handlePlayerSelectCard(card)}>
                  <CardDino card={card} type="battle" key={index} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
