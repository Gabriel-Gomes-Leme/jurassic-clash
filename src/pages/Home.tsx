import { Container } from "../components/Container";
import { Form } from "../components/Form";
import { useGameContext } from "../contexts/useGameContext";
import { Heading } from "../components/Heading";
import { Shop } from "../components/Shop";

export function Home() {
  const {state} = useGameContext()
  console.log('State' + state)

  return (
    <>
    <Heading />
    <Container>
      {state.step === 'start' && <Form />}

      {state.step == 'shop' && <Shop /> }
    </Container>
    </>
  );
}


