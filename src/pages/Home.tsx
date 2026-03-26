import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDragon } from "@fortawesome/free-solid-svg-icons";
import { Container } from "../components/Container";
import { Cards } from "../contexts/Cards";
import { CardDino } from "../components/CardDino";
import { Form } from "../components/Form";
import { useGameContext } from "../contexts/useGameContext";

export function Home() {
  const {state} = useGameContext()
  console.log('State' + state)

  return (
    <Container>
      <h1 className="title-1 text-center mb-4">
        Bem vindo ao Jurassic Clash <FontAwesomeIcon icon={faDragon} /> {state.player.name}
      </h1>

      <Form />

      <div className="row mt-5">
        {Cards.map((card) => (
          <div className="col-12 col-md-4 py-3" key={card.id}>
            <CardDino card={card} />
          </div>
        ))}
      </div>
    </Container>
  );
}


