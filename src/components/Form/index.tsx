import { useRef } from "react";
import type { PlayerModel } from "../../models/PlayerModel";
import { GameActionsTypes } from "../../contexts/GameActions";
import { useGameContext } from "../../contexts/useGameContext";
import style from "./style.module.css";

export function Form() {
  const userNameInput = useRef<HTMLInputElement>(null);
  const {state, dispatch} = useGameContext()
  console.log(state)
  function handleCreateUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (userNameInput.current == null) return;
    const userName = userNameInput.current.value.trim();
    console.log(userName);

    const newPlayer: PlayerModel = {
      name: userName,
      money: 340,
      deck: [],
    };
    dispatch({ type: GameActionsTypes.SET_PLAYER_NAME, payload: newPlayer });
  }
  return (
    <form onSubmit={handleCreateUser} className={style.form}>
      <input type="text" placeholder="Seu nome" ref={userNameInput} className={style.field} />
      <button type="submit" className="btn btn--green">Criar Usuário</button>
    </form>
  );
}