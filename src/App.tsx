
import './App.css'
import Popover from './components/popover/Popover';
import Accordion from './components/Accordion/Accordion';
import BarChartMain from './components/Barchart/BarChartMain';






function App() {

  return (
    <>
      <main>
        <ol>
        <li>
          <h2>Bar Chart</h2>
          <BarChartMain />
        </li>
        <li>
          <h2>Popover</h2>
          <Popover />
        </li>
        <li>
          <h2>Accordion</h2>
          <Accordion/>
        </li>
        </ol>
      </main>
    </>
  )
}

export default App;

