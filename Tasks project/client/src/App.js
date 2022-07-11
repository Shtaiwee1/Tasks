import logo from './logo.svg';
import './App.css';
import Main from './views/Main';
import Form from './components/Form'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import NewTask from './components/NewTask';

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/projects/new" element={<NewTask/>}/>
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;