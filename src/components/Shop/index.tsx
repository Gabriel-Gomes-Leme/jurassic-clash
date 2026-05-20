import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Cards } from "../../contexts/Cards";
import { GameActionsTypes } from "../../contexts/GameActions";
import { useGameContext } from "../../contexts/useGameContext";
import type { CardModel } from "../../models/CardModel";
import { Button } from "../Button";
import { CardDino } from "../CardDino";
import { faCoins, faStar } from "@fortawesome/free-solid-svg-icons";

import style from './style..module.css'
import { useState } from "react";

export function Shop(){

    const { state, dispatch } = useGameContext();
    const deck = state.player.deck.map((card) => card.id);
    const [filterType, setFilterType] = useState<'rarity' | 'cost'>();


    const rarityOrder ={
      common: 1,
      rare: 2,
      epic: 3,
      legendary: 4
    }

    function handleFilterType(type: 'rarity' | 'cost'){
      
      setFilterType(type)
    }

    const filterCards = [...Cards].filter((cardShop) => !deck.includes(cardShop.id))
        .sort((a,b) => {
          if(filterType == 'cost'){
            return a.cost - b.cost
          }
          else{
            return rarityOrder[b.rarity] - rarityOrder[a.rarity]
          }
        })

      function buyCard(card: CardModel) {
    dispatch({ type: GameActionsTypes.BUY_CARD, payload: { card } });
  }
    return(
        <>
        <h2 className="light text-center">Loja de Cartas</h2>
        <div className={`${style.shopFilter} d-flex justify-content-end align-items-center gap-2`}>
          <h3 className="fs-14 light text-center mt-0 mb-0">
            Filtros: 
          </h3>
          <Button type="button" className={`btn btn-filter ${filterType == 'cost' && 'active'} my-0 fs-14`} title="Ordenar por preço" ariaLabel="Ordenar por preço" onClick={() => handleFilterType('cost')}>
            <FontAwesomeIcon icon={faCoins}></FontAwesomeIcon>
          </Button>
          <Button type="button" className={`btn btn-filter ${filterType == 'rarity' && 'active'} my-0 fs-14`} title="Ordenar por raridade" ariaLabel="Ordenar por raridade" onClick={() => handleFilterType('rarity')}>
            <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
          </Button>
        </div>
          <div className="row mt-5">
        {filterCards
        .map((card) => {
          return (
            <div className="col-12 col-md-4 py-3" key={card.id}>
              <CardDino type="shop" card={card} />
              <div className="text-center">
                {state.player.money >= card.cost &&
                  state.player.deck.length < state.maxCardsInDeck && (
                    <Button
                    title="Comprar Carta"
                    ariaLabel="Comprar Carta"
                      type="button"
                      className="btn-game btn--buy mt-1"
                      onClick={() => buyCard(card)}
                    >
                      <FontAwesomeIcon icon={faCoins}></FontAwesomeIcon> {card.cost}
                    </Button>
                  )}
              </div>
            </div>
          );
        })}
      </div>
        </>
    )
}