import { faXmark } from "@fortawesome/free-solid-svg-icons";
import style from "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type modalProps = {
  children: React.ReactNode;
  closeModal?: () => void;
};

export function Modal({ children, closeModal }: modalProps) {
  return (
    <>
      <div className={style.modal}>
        <button className={style.closeButton} onClick={closeModal}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <div className={style.modalBody}>
            {children}
        </div>
      </div>
    </>
  );
}
