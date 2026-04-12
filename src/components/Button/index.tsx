import "./style.css";

type ButtonProps = {
    type: "button" | "submit" | "reset";
    title: string,
    ariaLabel: string,
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export function Button({type, title, ariaLabel, children, className, onClick} : ButtonProps) {
    return (
        <button type={type} title={title} aria-label={ariaLabel} className={className} onClick={onClick}>
              {children}
            </button>
    )
}