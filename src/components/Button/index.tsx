import "./style.css";

type ButtonProps = {
    type: "button" | "submit" | "reset";
    text: string;
    className?: string;
    onClick?: () => void;
}

export function Button({type, text, className, onClick} : ButtonProps) {
    return (
        <button type={type} title="Comprar carta" className={className} onClick={onClick}>
              {text}
            </button>
    )
}