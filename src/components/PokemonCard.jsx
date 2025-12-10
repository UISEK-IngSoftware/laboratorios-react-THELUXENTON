import {Card, CardMedia, CardContent, Typography, Button , CardActions} from "@mui/material";
export default function PokemonCard({ pokemon }) {
    return (
        <Card>
            <CardMedia
                component="img"
                height="200"
                image={pokemon.image}
                alt={pokemon.nombre}


            />
            <CardContent>
                <Typography variant="h5" component="div" align="center" gutterBottom>
                    {pokemon.nombre}
                  </Typography>
                <Typography variant="body2" sx ={{color: 'text.secondary'}} >
                    tipo:{pokemon.tipo}
                </Typography>
            </CardContent>

            <CardActions>
            <Button size="small">Ver detalles / </Button>
            </CardActions>
        </Card>

    );
}