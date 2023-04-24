import React from 'react';
import { useState } from 'react';
import './App.css';
import Search from './components/search/Search';
import DownloadLink from './components/download/DownloadLink';
import {urlResultObject, urlResultInterface} from './utls/urlResultObject';
import ErrorComponent from './components/error/ErrorComponent';

function App() {
  const[urlResult, setUrlResult] = useState<urlResultInterface|null>(urlResultObject);
  const[requestLimitError, setRequestLimitError] = useState<boolean>(false);
  return (
    <div className='App'>
      <div className='Container'>
        <Search 
          setUrlResult={setUrlResult}
          setRequestLimitError={setRequestLimitError}
        />
        {urlResult?.title ? 
          (<DownloadLink urlResult={urlResult}/>)
          : 
          null
        }
        { requestLimitError ? 
          (<ErrorComponent />)
          :
          null
        }
      </div>
    </div>
  );
}

export default App;
