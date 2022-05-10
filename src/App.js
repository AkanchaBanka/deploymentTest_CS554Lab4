import React from 'react';
import logo from './image/marvel_logo.png';
import './App.css';
import CharacterInfo from './components/CharacterInfo';
import CharactersPage from './components/CharactersPage';
import ComicsPage from "./components/ComicsPage";
import ComicInfo from "./components/ComicInfo";
import SeriesPage from "./components/SeriesPage";
import SeriesInfo from "./components/SeriesInfo";
import Error from './components/Error';
import IndexPage from './components/IndexPage';
import { Link ,Route, Routes,  BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-header">
          <a href="/">
            <img className="App-logo" alt="logo" src={logo} />
          </a>
          <br></br>
          <Link className="showlink" to="/characters/page/0">Characters</Link>
          <Link className="showlink" to="/comics/page/0">Comics</Link>
          <Link className="showlink" to="/series/page/0">Series</Link>
        </div>

          <Routes>
            <Route path="/"  element={<IndexPage/>}  />
            <Route path='/characters/page/:page' element={<CharactersPage/>} />
            <Route path='/characters/:id' element={<CharacterInfo/>} />
            <Route path='/comics/page/:page' element={<ComicsPage/>} />
            <Route path='/comics/:id' element={<ComicInfo/>} />
            <Route path='/series/page/:page' element={<SeriesPage/>} />
            <Route path='/series/:id' element={<SeriesInfo/>} />
            <Route path='*' element={<Error/>} status={404} />
          </Routes>

      </div>
    </Router>
  );
}

export default App;
