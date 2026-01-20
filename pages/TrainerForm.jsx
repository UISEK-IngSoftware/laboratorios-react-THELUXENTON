import { Box, TextField, Typography, Button, Container } from '@mui/material'; 
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 

// CORRECCIÓN AQUÍ: Agregamos "../src/" para que encuentre el archivo
import { createTrainer, updateTrainer, fetchTrainerById } from '../src/services/TrainerService';

export default function TrainerForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [trainerData, setTrainerData] = useState({
    first_name: '',
    last_name: '',
    age: '',
    date_of_birth: '',
    level: ''
  });

  useEffect(() => {
    if (id) loadData(id);
  }, [id]);

  const loadData = async (id) => {
      try {
          const data = await fetchTrainerById(id);
          setTrainerData({
              first_name: data.first_name,
              last_name: data.last_name,
              age: data.age,
              date_of_birth: data.date_of_birth, 
              level: data.level
          });
      } catch (error) {
          console.error(error);
      }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrainerData({ ...trainerData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) await updateTrainer(id, trainerData);
      else await createTrainer(trainerData);
      
      alert(id ? "¡Entrenador actualizado!" : "¡Entrenador creado!");
      navigate('/trainers'); 
    } catch (error) {
      console.error(error);
      alert("Error al guardar."); 
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        {id ? "Editar Entrenador" : "Registrar Entrenador"}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        
        <TextField 
          label="Nombre" name="first_name" 
          value={trainerData.first_name} onChange={handleChange} 
          variant="outlined" fullWidth required
        />

        <TextField 
          label="Apellido" name="last_name" 
          value={trainerData.last_name} onChange={handleChange} 
          variant="outlined" fullWidth required
        />

        <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField 
              label="Edad" name="age" type="number"
              value={trainerData.age} onChange={handleChange} 
              variant="outlined" fullWidth required
            />
            <TextField 
              label="Nivel" name="level" type="number"
              value={trainerData.level} onChange={handleChange} 
              variant="outlined" fullWidth required
            />
        </Box>

        <TextField 
            label="Fecha de Nacimiento"
            name="date_of_birth"
            type="date"
            value={trainerData.date_of_birth}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            InputLabelProps={{ shrink: true }} 
        />

        <Button type="submit" variant="contained" size="large" sx={{ mt: 2 }}>
          {id ? "Guardar Cambios" : "Crear Entrenador"}
        </Button>
        <Button onClick={() => navigate('/trainers')} color="inherit">
            Cancelar
        </Button>
      </Box>
    </Container>
  );
}