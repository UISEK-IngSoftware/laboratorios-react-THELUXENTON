import React, { useEffect, useState } from 'react';
import { Grid, Container, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 

// 👇 Asegúrate de que estas rutas sean correctas según tu estructura
import TrainerCard from '../src/components/TrainerCard'; 
import { fetchTrainers, deleteTrainer } from '../src/services/TrainerService'; 

export default function TrainerList() {
    const [trainers, setTrainers] = useState([]);
    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate(); 

    useEffect(() => {
        // 1. Verificamos si el usuario es administrador (tiene token)
        const token = localStorage.getItem('access_token');
        setIsAuth(!!token); // Convierte el token en true/false

        // 2. Cargamos los entrenadores
        loadTrainers();
    }, []); 

    const loadTrainers = async () => {
        try {
            const data = await fetchTrainers();
            // Aseguramos que sea un array antes de guardarlo
            if (Array.isArray(data)) {
                setTrainers(data);
            } else {
                console.warn("La API no devolvió una lista:", data);
                setTrainers([]);
            }
        } catch (error) {
            console.error("Error cargando entrenadores:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!isAuth) return; 

        const confirmacion = window.confirm("¿Estás seguro de eliminar a este entrenador?");
        if (!confirmacion) return;

        try {
            await deleteTrainer(id); 
            // Actualizamos la lista visualmente quitando el eliminado
            setTrainers((listaActual) => 
                listaActual.filter(t => t.id !== id) 
            );
            alert("¡Entrenador eliminado correctamente!");
        } catch (error) {
            console.error(error);
            alert("Error al eliminar.");
        }
    };

    const handleEdit = (trainer) => {
        if (!isAuth) return;
        navigate(`/edit-trainer/${trainer.id}`);
    };

    const handleViewDetails = (id) => {
        // Si tienes una página de detalles, úsala aquí. 
        // Si no, puedes dejarlo solo con un console.log o navegar a editar.
        console.log("Ver detalles de:", id);
        // navigate(`/trainer/${id}`); 
    };

    return (
        <Container sx={{ py: 4 }}>
            {/* ENCABEZADO: Título + Botón de Agregar (solo si es Admin) */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" fontWeight="bold" color="primary">
                    Lista de Entrenadores
                </Typography>

                {isAuth && (
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={() => navigate('/add-trainer')}
                    >
                        Nuevo Entrenador
                    </Button>
                )}
            </Box>

            {/* GRILLA DE TARJETAS */}
            <Grid container spacing={3}>
                {trainers.length > 0 ? (
                    trainers.map((trainer) => (
                        <Grid item key={trainer.id} xs={12} sm={6} md={4}> 
                            <TrainerCard 
                                trainer={trainer} 
                                onDelete={handleDelete}
                                onEdit={handleEdit}
                                onViewDetails={handleViewDetails}
                                isAuth={isAuth} // Pasamos el permiso a la tarjeta
                            />
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Typography variant="body1" align="center" color="text.secondary">
                            No hay entrenadores registrados aún.
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </Container>
    );
}