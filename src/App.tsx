import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import Search from './components/search/Search';
import DownloadLink from './components/download/DownloadLink';
import {urlResultObject, urlResultInterface} from './components/download/util/urlResultObject';

function App() {
  const[urlResult, setUrlResult] = useState<urlResultInterface|null>(urlResultObject);
  // const[downloadLink, setDownloadLink] = useState<string|undefined>('');
  
  return (
    <div className='App'>
      <div className='Container'>
        <Search 
          // setDownloadLink={setDownloadLink}
          setUrlResult={setUrlResult}
        />
        {urlResult?.title ? 
          (<DownloadLink urlResult={urlResult}/>)
          : 
          null
        }
      </div>
    </div>
  );
}

export default App;
