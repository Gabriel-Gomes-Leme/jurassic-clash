import { Cards } from "../../contexts/Cards";
import { GameActionsTypes } from "../../contexts/GameActions";
import { useGameContext } from "../../contexts/useGameContext";
import type { CardModel } from "../../models/CardModel";
import { Button } from "../Button";
import { CardDino } from "../CardDino";

export function Shop(){

    const { state, dispatch } = useGameContext();
    const deck = state.player.deck.map((card) => card.id);

      function buyCard(card: CardModel) {
    dispatch({ type: GameActionsTypes.BUY_CARD, payload: { card } });
  }
    return(
        <>
        <h2 className="light text-center">Loja de Cartas</h2>
          <div className="row mt-5">
        {Cards.filter((cardShop) => !deck.includes(cardShop.id)).map((card) => {
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
                      className="btn btn--green mt-2"
                      onClick={() => buyCard(card)}
                    >
                      Buy: ${card.cost}
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