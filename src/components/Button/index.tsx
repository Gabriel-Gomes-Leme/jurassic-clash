import "./style.css";

type ButtonProps = {
    type: "button" | "submit" | "reset";
    title: string,
    ariaLabel: string,
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}

export function Button({type, title, ariaLabel, children, className, style, onClick} : ButtonProps) {
    return (
        <button type={type} title={title} aria-label={ariaLabel} className={className} style={style} onClick={onClick}>
              {children}
            </button>
    )
}