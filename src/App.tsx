
import "./App.css";
import "./styles/global.css";
import { GameContextProvider } from "./contexts/GameContextProvider";
import { Home } from "./pages/Home";

function App() {

  return (
    <>
    <GameContextProvider>
      <Home></Home>
    </GameContextProvider>
      
    </>
  );
}

export default App;
