import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Container } from '@mui/material'

// Componentes Generales
import Header from './components/Header'
import Login from '../pages/Login'

// Páginas de Pokemon
import PokemonList from '../pages/PokemonList'
import PokemonForm from '../pages/PokemonForm'
import PokemonDetails from '../pages/PokemonDetails';

// Páginas de Entrenadores (NUEVO)
import TrainerList from '../pages/TrainerList';
import TrainerForm from '../pages/TrainerForm';

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Container>
        <Routes>
          {/* --- RUTAS DE POKEMON --- */}
          <Route path="/" element={<PokemonList />} />
          <Route path="/add-pokemon" element={<PokemonForm />} />
          <Route path="/edit-pokemon/:id" element={<PokemonForm />} />
          <Route path="/pokemon/:id" element={<PokemonDetails />} />

          {/* --- RUTAS DE ENTRENADORES  --- */}
          <Route path="/trainers" element={<TrainerList />} />
          <Route path="/add-trainer" element={<TrainerForm />} />
          <Route path="/edit-trainer/:id" element={<TrainerForm />} />

          {/* --- AUTENTICACIÓN --- */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App