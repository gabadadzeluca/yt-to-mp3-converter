import { useRef, useState } from 'react';
import axios from 'axios';

export default function Search(props:{
  urlResult: object|null;
  setUrlResult: (urlResult: object | null)=>void;
  downloadLink: string|undefined;
  setDownloadLink: (downloadLink: string|undefined)=>void;
}) {
  const {urlResult, setUrlResult, downloadLink, setDownloadLink} = props;
  const inputUrlRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    const id = parseYoutubeId(inputUrlRef.current?.value ?? '');
    // setVideoId(id);
    if(id) makeRequest(id);
  }
  const makeRequest = async (id:string) => {
    console.log('videoID: ',id)
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
      setDownloadLink(response.data.link);
    }catch(error){
      console.log("ERROR: ",error);
    }
  }
  const parseYoutubeId = (url: string|URL): string | undefined | null => {
    try {
      const videoUrl = new URL(url);
      if (videoUrl.hostname === 'www.youtube.com' || videoUrl.hostname === 'youtube.com') {
        const params = new URLSearchParams(videoUrl.search);
        return params.get('v');
      } else if (videoUrl.hostname === 'youtu.be') {
        return videoUrl.pathname.substring(1);
      }
    } catch (error) {
      console.error('Invalid YouTube URL', error);
    }
    return undefined;
  }


  return (
    <div>
      <form>
        <input type='text' 
          ref={inputUrlRef}
        />
        <button 
          type='submit'
          onClick={handleSubmit} 
         >
          Submit
        </button>
      </form>
    </div>
  );
}