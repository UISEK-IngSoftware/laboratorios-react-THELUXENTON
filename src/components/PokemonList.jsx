import { Grid } from "@mui/material";
import PokemonCard from "./PokemonCard";
import { pokemons } from "../data/pokemons";
export default function Pokemonlist() {
    return (
         <Grid container spacing={2}>
          {pokemons.map((pokemon) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <PokemonCard pokemon={pokemon} />
            </Grid>
          ))}
        </Grid>
    );
}