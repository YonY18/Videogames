import './App.css';
import {Routes, Route} from 'react-router-dom';

import LandingPage from './components/LandingPage.js'
import Home from './components/Home.js';
import Create from './components/Create.js';
import Detail from './components/Detail.js'

const App = () => {
  return (
    <div className="App">    
        <Routes>         
          <Route exact path='/' element={<LandingPage/>}/>   
          <Route exact path='/Home' element={<Home/>}/> 
          <Route exact path='/games/:id' element={<Detail/>}/>
          <Route path='/newGames' element={<Create/>}/>        
        </Routes>   
    </div>
  );
}
export default App;


