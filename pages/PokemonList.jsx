import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PokemonCard from '../src/components/PokemonCard';
import { fetchPokemons, deletePokemon } from '../src/services/PokemonService';

export default function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const navigate = useNavigate();

  const isAuth = Boolean(localStorage.getItem('access_token'));

  useEffect(() => {
    fetchPokemons()
      .then(data => setPokemons(Array.isArray(data) ? data : []))
      .catch(err => console.error('Error:', err));
  }, []);

  const handleDelete = async (id) => {
    if (!isAuth || !window.confirm('¿Eliminar este Pokémon permanentemente?')) return;

    try {
      await deletePokemon(id);
      setPokemons(prev => prev.filter(p => p.id !== id));
      alert('¡Pokémon eliminado correctamente!');
    } catch (error) {
      console.error(error);
      alert('Error al eliminar.');
    }
  };

  return (
    <Grid container spacing={2}>
      {pokemons.map((pokemon) => (
        <Grid item key={pokemon.id} xs={12} sm={6} md={4}>
          <PokemonCard
            pokemon={pokemon}
            isAuth={isAuth}
            onDelete={handleDelete}
            onEdit={() => navigate(`/edit-pokemon/${pokemon.id}`)}
            onViewDetails={() => navigate(`/pokemon/${pokemon.id}`)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
