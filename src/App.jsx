import Header from './components/Header'
import './App.css'
import { Container, Grid } from "@mui/material"
import PokemonCard from './components/PokemonCard'
import Pokemonlist from './components/PokemonList'

function App() {
  return (
    <>
      <Header title="Pokedex" />

      <Container sx={{ padding: 2 }}>
       <Pokemonlist />
      </Container>
    </>
  )
}

export default App