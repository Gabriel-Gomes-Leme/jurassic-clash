
import { faDragon } from '@fortawesome/free-solid-svg-icons'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container } from './components/Container'
import './styles/global.css'
import { Cards } from './models/Cards'

function App() {

  return (
    <>
      <Container>
        <h1 className='title-1 text-center'>
          Bem vindo ao Jurassic Clash <FontAwesomeIcon icon={faDragon} />
        </h1>
        {Cards.map((card) => (
  <div key={card.id}>
    {card.name}
  </div>
))}
      </Container>

      
    </>
  )
}

export default App
