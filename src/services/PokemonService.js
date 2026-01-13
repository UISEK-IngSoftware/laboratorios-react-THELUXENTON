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
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        console.error("Error detallado al crear:", error.response?.data);
        throw error;
    }
}
// Eliminar un pokemon por ID
export async function deletePokemon(id) {
    try {
        const response = await axios.delete(`${API_BASE_URL}/pokemons/${id}/`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar pokemon:", error.response?.data);
        throw error;
    }
}

// Actualizar un pokemon existente
export async function updatePokemon(id, pokemonData) {
    const formData = new FormData();
    formData.append('name', pokemonData.name);
    formData.append('type', pokemonData.type);
    formData.append('weight', parseFloat(pokemonData.weight));
    formData.append('height', parseFloat(pokemonData.height));

    // Solo adjuntamos la imagen si el usuario seleccionó una nueva
    if (pokemonData.picture instanceof File) {
        formData.append('picture', pokemonData.picture);
    }

    try {
        // Usamos PUT o PATCH según lo que requiera tu API
        const response = await axios.put(`${API_BASE_URL}/pokemons/${id}/`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        console.error("Error al actualizar pokemon:", error.response?.data);
        throw error;
    }
}

// Obtener detalles de un solo pokemon 
export async function fetchPokemonById(id) {
    const response = await axios.get(`${API_BASE_URL}/pokemons/${id}/`);
    return response.data;
}