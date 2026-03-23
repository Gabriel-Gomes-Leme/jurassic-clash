import { faDragon } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "./components/Container";
import "./styles/global.css";
import { Cards } from "./models/Cards";
import { CardDino } from "./components/CardDino";

function App() {
  return (
    <>
      <Container>
        <h1 className="title-1 text-center mb-4">
          Bem vindo ao Jurassic Clash <FontAwesomeIcon icon={faDragon} />
        </h1>
        <div className="row mt-5">
          {Cards.map((card) => (
          <div className="col-12 col-md-4 py-3">
            <CardDino card={card} />
          </div>
        ))}
        </div>
      </Container>
    </>
  );
}

export default App;
