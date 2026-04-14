import { Container } from "../components/Container";
import { Form } from "../components/Form";
import { useGameContext } from "../contexts/useGameContext";
import { Heading } from "../components/Heading";
import { Lobby } from "../components/Lobby";
import { DinoCash } from "../components/DinoCash";
import { Battle } from "../components/Battle";
import { Winner } from "../components/Winner";

export function Home() {
  const {state} = useGameContext()
  console.log('State' + state)

  return (
    <>
    <Heading />
    
      {state.step === 'start' &&  <Container><Form /> </Container>}

      {state.step == 'shop' && <Container><Lobby /></Container> }
    
    
      {state.step == 'battle' && <Container type="fluid"><Battle /> </Container>}
    
    {state.step == 'end' && <Winner/>}
    <DinoCash />
    </>
  );
}


