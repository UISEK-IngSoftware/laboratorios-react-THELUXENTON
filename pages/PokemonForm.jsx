import { Box, TextField, Typography, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createPokemon,
  updatePokemon,
  fetchPokemonById
} from '../src/services/PokemonService';

const initialState = {
  name: '',
  type: '',
  weight: '',
  height: '',
  picture: null,
};

export default function PokemonForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [pokemonData, setPokemonData] = useState(initialState);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetchPokemonById(id)
      .then(data => {
        setPokemonData(data);
        setPreview(data.picture);
      })
      .catch(err => console.error("Error cargando datos:", err));
  }, [id]);

  const handleChange = ({ target }) => {
    const { name, value, files } = target;

    if (files) {
      const file = files[0];
      setPokemonData(prev => ({ ...prev, picture: file }));

      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPokemonData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      id
        ? await updatePokemon(id, pokemonData)
        : await createPokemon(pokemonData);

      alert(`¡Pokemon ${id ? 'actualizado' : 'creado'} con éxito!`);
      navigate('/');
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Hubo un error al guardar.");
    }
  };

  return (
    <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h5" gutterBottom>
        {id ? "Editar Pokemon" : "Nuevo Pokemon"}
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 400 }}
      >
        {['name', 'type', 'weight', 'height'].map((field) => (
          <TextField
            key={field}
            label={field === 'name' ? 'Nombre' :
                   field === 'type' ? 'Tipo' :
                   field === 'weight' ? 'Peso' : 'Altura'}
            name={field}
            type={field === 'weight' || field === 'height' ? 'number' : 'text'}
            value={pokemonData[field]}
            onChange={handleChange}
            required
          />
        ))}

        <Typography variant="body2" fontWeight="bold">
          Foto del Pokemon:
        </Typography>

        {preview && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={preview}
              alt="Vista previa"
              style={{
                width: 150,
                height: 150,
                objectFit: 'contain',
                borderRadius: 8,
                border: '1px solid #ddd'
              }}
            />
          </Box>
        )}

        <input
          type="file"
          name="picture"
          accept="image/*"
          onChange={handleChange}
          required={!id}
        />

        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          {id ? "Guardar Cambios" : "Guardar Pokemon"}
        </Button>

        <Button onClick={() => navigate('/')} color="inherit">
          Cancelar
        </Button>
      </Box>
    </Box>
  );
}
