import { Card, CardContent, Typography, CardActions, Button, Box } from "@mui/material";

export default function TrainerCard({ trainer, onDelete, onEdit, isAuth }) {
    return (
        
        <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
            <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                
                {/* Nombre Principal */}
                <Typography variant="h6" component="div" fontWeight="bold" sx={{ lineHeight: 1.2, mb: 0.5 }}>
                    {trainer.first_name} {trainer.last_name}
                </Typography>

                {/* Nivel como subtítulo simple */}
                <Typography variant="caption" color="primary" sx={{ textTransform: 'uppercase', fontWeight: 'bold', mb: 2, display: 'block', letterSpacing: 1 }}>
                    Nivel {trainer.level}
                </Typography>

                {/* Datos en texto plano */}
                <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Edad:</strong> {trainer.age} años
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Cumpleaños:</strong> {trainer.date_of_birth}
                    </Typography>
                </Box>
            </CardContent>
            
            {/* Botones simples (solo texto) */}
            {isAuth && (
                <CardActions sx={{ pt: 0 }}>
                    <Button 
                        size="small" 
                        onClick={() => onEdit(trainer)}
                        sx={{ minWidth: 0, mr: 1 }}
                    >
                        Editar
                    </Button>
                    <Button 
                        size="small" 
                        color="error" 
                        onClick={() => onDelete(trainer.id)}
                        sx={{ minWidth: 0 }}
                    >
                        Eliminar
                    </Button>
                </CardActions>
            )}
        </Card>
    );
}