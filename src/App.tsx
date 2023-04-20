import React from 'react';
import { useState } from 'react';
import './App.css';
import Search from './components/search/Search';
import DownloadLink from './components/download/DownloadLink';
import {urlResultObject, urlResultInterface} from './utls/urlResultObject';

function App() {
  const[urlResult, setUrlResult] = useState<urlResultInterface|null>(urlResultObject);
  
  return (
    <div className='App'>
      <div className='Container'>
        <Search 
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
