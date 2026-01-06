import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export async function fetchPokemons() {
    const url = `${API_BASE_URL}/pokemons/`;
    const response = await axios.get(url, {
        params: {
            client_id: CLIENT_ID, 
            client_secret: CLIENT_SECRET 
        }
    });
    return response.data;
}


export async function createPokemon(pokemonData) {
    const formData = new FormData();

    formData.append('name', pokemonData.name);
    formData.append('type', pokemonData.type);
    
    formData.append('weight', parseFloat(pokemonData.weight));
    formData.append('height', parseFloat(pokemonData.height));

    if (pokemonData.picture) {
        formData.append('picture', pokemonData.picture);
    }

    try {
        const response = await axios.post(`${API_BASE_URL}/pokemons/`, formData, {
            headers: {
                // IMPORTANTE: Indicamos que enviamos un formulario con archivos
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error detallado del servidor:", error.response?.data);
        throw error;
    }
}