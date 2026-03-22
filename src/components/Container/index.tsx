
import styles from './style.module.css'
type containerProps = {
    children: React.ReactNode
}
export function Container({children} : containerProps){
    return(
        <div className={styles.container}>
            {children}
        </div>
    )
}