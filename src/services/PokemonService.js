// PokemonService.js (Código CORREGIDO)

import axios from "axios";

// Asegúrate de que estas variables se carguen correctamente (ej. VITE_CLIENT_ID)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

/**
 * Obtener Pokemons desde la API
 * @returns dato Pokemons
 */
export async function fetchPokemons() {
    const url = `${API_BASE_URL}/pokemons/`;

    // Incluir credenciales para resolver el 401 Unauthorized
    const response = await axios.get(url, {
        params: {
            client_id: CLIENT_ID, 
            client_secret: CLIENT_SECRET 
        }
    });

    return response.data;
}

// Asegúrate de que tu función createPokemon, si existe, también use 'axios' correctamente.