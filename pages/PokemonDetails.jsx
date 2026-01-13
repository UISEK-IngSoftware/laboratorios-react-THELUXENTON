import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Chip } from '@mui/material';
import { fetchPokemonById } from '../src/services/PokemonService';

export default function PokemonDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        fetchPokemonById(id)
            .then(data => setPokemon(data))
            .catch(error => console.error(error));
    }, [id]);

    if (!pokemon) return <Typography align="center" sx={{ mt: 4 }}>Cargando...</Typography>;

    return (
        <Box sx={{ 
            p: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: 2 
        }}>
            {/* Título Grande */}
            <Typography variant="h3" sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
                {pokemon.name}
            </Typography>

            {/* Imagen Grande */}
            <Box 
                component="img"
                src={pokemon.picture} 
                alt={pokemon.name}
                sx={{ 
                    width: '300px', 
                    height: '300px', 
                    objectFit: 'contain'
                    
                }}
            />

            {/* Chip de Tipo (Etiqueta de color) */}
            <Chip 
                label={pokemon.type} 
                color="primary" 
                variant="outlined" 
                sx={{ fontSize: '1.2rem', px: 2, py: 2 }} 
            />

            {/* Datos Técnicos */}
            <Box sx={{ display: 'flex', gap: 4, mt: 2 }}>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" color="primary">{pokemon.weight} kg</Typography>
                    <Typography variant="caption" color="text.secondary">PESO</Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" color="primary">{pokemon.height} m</Typography>
                    <Typography variant="caption" color="text.secondary">ALTURA</Typography>
                </Box>
            </Box>

            {/* Botón Volver */}
            <Button 
                variant="contained" 
                onClick={() => navigate('/')}
                sx={{ mt: 4, px: 5 }}
            >
                Volver a la lista
            </Button>
        </Box>
    );
}