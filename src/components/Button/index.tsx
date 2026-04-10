import "./style.css";

type ButtonProps = {
    type: "button" | "submit" | "reset";
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export function Button({type, children, className, onClick} : ButtonProps) {
    return (
        <button type={type} title="Comprar carta" className={className} onClick={onClick}>
              {children}
            </button>
    )
}