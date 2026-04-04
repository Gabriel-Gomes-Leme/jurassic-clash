
import styles from './style.module.css'
type containerProps = {
    children: React.ReactNode,
    type?: "fluid" | ""
}
export function Container({children, type} : containerProps){
    return(
        <div className={type === "fluid" ? 'container-fluid': styles.container}>
            {children}
        </div>
    )
}