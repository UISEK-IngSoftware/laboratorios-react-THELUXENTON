import { Card, CardContent, CardMedia, Typography, CardActions, Button } from "@mui/material";

export default function PokemonCard({ pokemon, onDelete, onEdit, onViewDetails, isAuth }) {

    const pokemonImageUrl = pokemon.picture; 
    
    return (
        <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
                component="img"
                height={200}
                image={pokemonImageUrl}
                alt={pokemon.name}
                sx={{ objectFit: "contain", paddingTop: 2 }} 
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="div">
                    {pokemon.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Tipo: {pokemon.type}
                </Typography>
            </CardContent>
            
            <CardActions sx={{ justifyContent: 'space-between', padding: 1 }}>
                {/* El botón Detalles SIEMPRE se ve */}
                <Button 
                    size="small" 
                    onClick={() => onViewDetails(pokemon.id)}
                >
                    Detalles
                </Button>

                {/* LOS BOTONES DE ADMINISTRADOR SOLO SI isAuth es TRUE */}
                {isAuth && (
                    <>
                        <Button 
                            size="small" 
                            color="primary"
                            onClick={() => onEdit(pokemon)}
                        >
                            Editar
                        </Button>

                        <Button 
                            size="small" 
                            color="error" 
                            onClick={() => onDelete(pokemon.id)}
                        >
                            Eliminar
                        </Button>
                    </>
                )}

            </CardActions>
        </Card>
    );
}