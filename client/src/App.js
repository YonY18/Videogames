import './App.css';
import { BrowserRouter ,Route , Routes} from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Home from './components/Home'
import Create from './components/Create'
import Detail from './components/Detail';
import "./Estilos/normalize.css"

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<LandingPage/>}/>
          <Route exact path='/home' element={<Home/>}/>
          <Route exact path='/videogames/:id' element={<Detail/>} />
          <Route exact path='/videogame' element={<Create/>}/>  
        </Routes>
      </div>
    </BrowserRouter>
  );
}




