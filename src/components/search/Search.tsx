import { useRef, useState } from 'react';
import axios from 'axios';
import styles from './Search.module.css';
import images from '../../utls/images';
import {urlResultInterface} from '../../utls/urlResultObject';

export default function Search(props:{
  setUrlResult: (urlResult: urlResultInterface|null)=>void;
  setRequestLimitError: (boolean: boolean) => void;
}) {
  const {setUrlResult, setRequestLimitError} = props;
  const inputUrlRef = useRef<HTMLInputElement>(null)
  const[urlError, setUrlError] = useState<boolean>(false);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    setRequestLimitError(false);
    if(inputUrlRef.current?.value == '') return;
    const id = parseYoutubeId(inputUrlRef.current?.value ?? '');
    if(inputUrlRef.current?.value) inputUrlRef.current.value = ''; //clear out the input field
    setUrlResult(null); // reset url result
    if(id) makeRequest(id);
    else setUrlError(true);
  }
  const makeRequest = async (id:string) => {
    const options = {
      method: 'GET',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      params: {id: `${id}`},
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      }
    };
    try{
      const response = await axios.request(options);
      setUrlResult(response.data);
    }catch(error: any){
      if(error.response.status === 429) setRequestLimitError(true);
    }
  }
  const parseYoutubeId = (url: string|URL): string | undefined | null => {
    try {
      const videoUrl = new URL(url);
      if (videoUrl.hostname === 'www.youtube.com' || videoUrl.hostname === 'youtube.com') {
        const params = new URLSearchParams(videoUrl.search);
        setUrlError(false);
        return params.get('v');
      } else if (videoUrl.hostname === 'youtu.be') {
        setUrlError(false);
        return videoUrl.pathname.substring(1);
      }
    } catch (error) {
      console.error('Invalid YouTube URL', error);
      setUrlError(true);
    }
    return undefined;
  }

  return (
    <div className={styles.searchDiv}>
      <div className={styles.imgDiv}>
        <img src={images.ytlogo} />
      </div>
      <form>
        <input type='text' 
          placeholder='Paste YT link'
          ref={inputUrlRef}
          className={styles.input}
        />
        <button 
          type='submit'
          onClick={handleSubmit} 
          className={styles.button}
         >
        </button>
      </form>
      {urlError ? 
        (
          <div className={styles.error}>
            <h3>Invalid URL</h3>
            <p>Use one of these formats:</p>
            <p>https://<b>www.youtube.com</b>/watch?v=dQw4w9WgXcQ</p>
            <p>https://<b>youtu.be</b>/watch?v=dQw4w9WgXcQ</p>
          </div>
        )
        :
        null
      }
    </div>
  );
}