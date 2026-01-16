import { useState, useEffect } from 'react'
import { getData } from '../../Server/Api';
import BarChart from './BarChart';
import Control from './Control';


export default function BarChartMain() {
    const transformData = (item: any) => ({
        id: item.id,
        label: item.name,
        value: item.ticketCount,
        colour: item.colour,
    });

    function getSortedChartItems(mode: string, items: any[]) {
      if (mode === 'default') return items;
    
      const direction = mode === 'ascending' ? 1 : -1;
      const itemsCopy = [...items];
    
      return itemsCopy.sort(
        (a, b) => (a.ticketCount - b.ticketCount) * direction
      );
    }

    const [data, setData] = useState<any[]>([]);
  const [status, setStatus] = useState<string>('idle');
  const [mode, setMode] = useState('default');

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

  const sortedChartItems = getSortedChartItems(
    mode,
    data
  );

    return (
        <>
        <div className="controls-wrapper">
          <Control mode={mode} onChangeMode={setMode} />
        </div>
        <div className='chart-wrapper'>
          {status === 'loading' && <p>...loading</p>}
          {status === 'error' && <p>...Something went wrong</p>}
          {status === 'success' && <BarChart items={sortedChartItems} transformer={transformData} />}
        </div>
        </>
    );
}