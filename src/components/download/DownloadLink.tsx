import {urlResultInterface} from './util/urlResultObject';
import styles from './DownloadLink.module.css';

export default function DownloadLink(props:{
  urlResult: urlResultInterface|null;
}){
  
  const urlResult = props.urlResult;
  const link = urlResult?.link;
  const title = urlResult?.title;
  return(
    <div className={styles.downloadDiv}>
      <h3 className={styles.title}>{title}</h3>
      <button className={styles.downloadBtn}>
        <a href={link} >
            Download mp3
        </a>
      </button>
    </div>
  );
}