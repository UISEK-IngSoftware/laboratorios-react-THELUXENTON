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

// 1. Obtener todos
export async function fetchTrainers() {
    const response = await axios.get(`${API_BASE_URL}/entrenadores/`, {
        params: { client_id: CLIENT_ID, client_secret: CLIENT_SECRET }
    });
    return response.data;
}

// 2. Crear
export async function createTrainer(trainerData) {
    try {
        const response = await axios.post(`${API_BASE_URL}/entrenadores/`, trainerData);
        return response.data;
    } catch (error) {
        console.error("Error creando entrenador:", error.response?.data);
        throw error;
    }
}

// 3. Actualizar
export async function updateTrainer(id, trainerData) {
    try {
        const response = await axios.put(`${API_BASE_URL}/entrenadores/${id}/`, trainerData);
        return response.data;
    } catch (error) {
        console.error("Error actualizando:", error.response?.data);
        throw error;
    }
}

// 4. Eliminar
export async function deleteTrainer(id) {
    await axios.delete(`${API_BASE_URL}/entrenadores/${id}/`);
}

// 5. Obtener uno por ID
export async function fetchTrainerById(id) {
    const response = await axios.get(`${API_BASE_URL}/entrenadores/${id}/`);
    return response.data;
}