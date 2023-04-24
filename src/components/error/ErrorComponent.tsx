import styles from './ErrorComponent.module.css';

export default function ErrorComponent(){
  return(
    <div className={styles.error}>
      We're sorry, today's request limit has already been reached {':('}
    </div>
  );
}