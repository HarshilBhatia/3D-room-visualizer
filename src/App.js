
import './App.css';
import PointCloudViewer from './components/main.js';

function App() {
  return (
    <div className="App">
      <PointCloudViewer pointCloudUrl="pcd_down.ply" /> 
    </div>
    // the error was due to absolute path loading. Always load relative to public.

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
