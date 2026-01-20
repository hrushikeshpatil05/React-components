import "./App.css";
import Popover from "./components/popover/Popover";
import Accordion from "./components/Accordion/Accordion";
import BarChartMain from "./components/Barchart/BarChartMain";
import Carousel from "./components/Carousel/Carousel";
import ToDoList from "./components/To-do List/ToDoList";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <main>
        <ol>
          {/* <li>
            <h2>Buggy Todo (Debug Me!)</h2>
            <BuggyTodo />
          </li> */}
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
            <Accordion />
          </li>
          <li>
            <h2>Carousel</h2>
            <Carousel />
          </li>
          <li>
            <h2>To-do List</h2>
            <ToDoList />
          </li>
          <li>
            <h2>NavBar</h2>
            <Navbar />
          </li>
        </ol>
      </main>
    </>
  );
}

export default App;
