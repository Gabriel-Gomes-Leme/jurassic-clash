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

  function updateDamageCard(card: CardModel, damage: number): CardModel {
    if (card.hp <= 0) {
      return card;
    }
    const newHp = Math.max(0, card.hp - damage);
    return {
      ...card,
      hp: newHp,
    };
  }

  // Funçao que calcula os scores de cada jogador
  function handleScore(updateCpuCard: CardModel, updatePlayerCard: CardModel) {
    const playerWon = updateCpuCard.hp <= 0;
    const cpuWon = updatePlayerCard.hp <= 0;
    dispatch({
      type: GameActionsTypes.SET_SCORE,
      payload: {
        playerWon:
          playerWon,
        cpuWon:
          cpuWon
      },
    });
  }
  function handleStartFight(
    playerCard: CardModel | null,
    cpuCard: CardModel | null,
  ) {
    if (playerCard && cpuCard) {
      const cpuDamage = Math.max(
        0,
        playerCard.attack * (1 - cpuCard.defense / 100),
      );
      const playerDamage = Math.max(
        0,
        cpuCard.attack * (1 - playerCard.defense / 100),
      );

      const updateCpuCard = updateDamageCard(cpuCard, cpuDamage);
      const updatePlayerCard = updateDamageCard(playerCard, playerDamage);

      dispatch({
        type: GameActionsTypes.START_BATTLE,
        payload: {
          playerCard: updatePlayerCard.hp > 0 ? updatePlayerCard : null,
          cpuCard: updateCpuCard.hp > 0 ? updateCpuCard : null,
          turn:
            updateCpuCard.hp > 0 && updatePlayerCard.hp <= 0
              ? state.player.name
              : "cpu",
        },
      });

      // Define os scores de cada jogador
      handleScore(updateCpuCard, updatePlayerCard);
    }
  }

  function handleWinner(winner: string) {
    dispatch({
      type: GameActionsTypes.FINISH_BATTLE,
      payload: { winner: winner },
    });
  }

  useEffect(() => {
    if (
      !state.battle.arena.cpuSelectedCard &&
      state.battle.cpuDeck.length > 0 &&
      state.battle.arena.turn === "cpu"
    ) {
      handleCpuSelectCard();
    }
  }, [state.battle.arena.cpuSelectedCard,
  state.battle.arena.turn,
  state.battle.cpuDeck.length]);

  useEffect(() => {
    handleCpuDeck(state.maxCardsInDeck);
  }, []);

  useEffect(() => {
    if (state.battle.winner) {
      return;
    }
    if (state.battle.cpuScore >= 4) {
      handleWinner("cpu");
      console.log('cpuScore: ' +state.battle.cpuScore)
    }
    if (state.battle.playerScore >= 4) {
      handleWinner(state.player.name);
      console.log('playerScore: ' +state.battle.playerScore)
    }
  }, [state.battle.cpuScore, state.battle.playerScore, state.battle.winner]);
  console.log('vencedor:' +state.battle.winner)
  


  return (
    <>
      <div className="py-5">
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
                      <div onClick={() => handlePlayerSelectCard(card)}>
                        <CardDino card={card} type="player" key={index} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <h2 className="light text-center">
              {state.battle.arena.turn} turn
            </h2>
            <div className="battleCamp">
              <div className={style.cardSelected}>
                {state.battle.arena.playerSelectedCard ? (
                  <>
                    <CardDino
                      card={state.battle.arena.playerSelectedCard}
                      type="player"
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
                  <div className="emptyCard">Selecione uma carta</div>
                )}
              </div>
              <h2 className="light text-center my-5">VS</h2>
              <div className={style.cardSelected}>
                {state.battle.arena.cpuSelectedCard ? (
                  <>
                    <CardDino
                      card={state.battle.arena.cpuSelectedCard}
                      type="player"
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
                  <div className="emptyCard">Aguardando CPU</div>
                )}
              </div>
              {state.battle.arena.playerSelectedCard &&
                state.battle.arena.cpuSelectedCard && (
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
      </div>
    </>
  );
}
