import { useState, useEffect } from 'react'
import './App.css'
import { getData } from './Server/Api';
import BarChart from './components/BarChart';

function App() {

  const [data, setData] = useState<any[]>([]);
  const [status, setStatus] = useState<string>('idle');

  useEffect(() => {
    setStatus('loading');
    getData().then((res: any) => {
      (setData(res));
      setStatus('success');
    }).catch((error: any) => {
      console.error(error)
      setStatus('error');
    });
  }, []);
  return (
    <>
      <main>
        <div className='chart-wrapper'>
          {status === 'loading' && <p>...loading</p>}
          {status === 'error' && <p>...Something went wrong</p>}
          {status === 'success' && <BarChart items={data} />}
        </div>
      </main>
    </>
  )
}

export default App
function setError(error: any) {
  throw new Error('Function not implemented.');
}

