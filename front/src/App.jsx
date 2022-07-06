import { useEffect } from "react";
import Pokemon from "./pages/Pokemon";
import Type from "./pages/Type";
import bulbasaur from "./icons/pokemons/bulba.svg";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import instance from "./config/instance";

function App() {
  useEffect(async () => {
    await instance.post('/trainers', {
      "id": "63b2dddf-c2d7-497a-8fd1-e236990b16d0",
      "name": "user",
      "email": "user@mail.com",
      "password": "pass"
    })
  }, [])
  
  localStorage.setItem("trainerId", "63b2dddf-c2d7-497a-8fd1-e236990b16d0");

  return (
    <div className="App bg-white">
      <Router>
        <div className="flex gap-2 items-center w-full h-20 bg-theme">
          <img className="w-16 h-auto" src={bulbasaur} />
          <Link to="/" className="text-white font-semibold text-4xl">Bulba</Link>
          <div className="flex gap-2 items-center text-white">
            <Link to="/">Pokemons</Link>
            |
            <Link to="/types">Tipos</Link>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Pokemon />} />
          <Route path="/types" element={<Type />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
