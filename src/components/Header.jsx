import { AppBar, Container, Toolbar, Button } from "@mui/material"; 
import pokedexLogo from "../assets/pokedex_logo.png"; 
import "./Header.css";

// 1. AGREGAMOS useLocation para que el menú se actualice al navegar
import { logout } from "../services/userService";
import { useNavigate } from "react-router-dom";
export default function Header() {
    const navigate = useNavigate();

    // Esta línea se ejecuta de nuevo cada vez que cambias de ruta gracias a 'location'
    const isLoggedIn = localStorage.getItem('access_token') !== null;

    const handleLogout = async () => {
        await logout(); 
        navigate('/login'); 
    };

    return (
        <Container>
            <header>
                <div className="pokedex-navbar">
                    <AppBar position="static">
                        <Toolbar>
                            <div className="image-container">
                                <img src={pokedexLogo} alt="Pokedex Logo" height={100} />
                            </div>
                        </Toolbar>
                        
                        <Toolbar>
                            <Container>
                                <Button color="inherit" href="/">
                                    Inicio
                                </Button>

                                {/* BOTÓN DE ENTRENADORES  */}
                                <Button color="inherit" href="/trainers">
                                    Entrenadores
                                </Button>

                                {isLoggedIn ? (
                                    // SI ESTÁ LOGUEADO: Muestra Agregar y Cerrar Sesión
                                    <>
                                        <Button color="inherit" href="/add-pokemon">
                                            Agregar Pokemon
                                        </Button>
                                        <Button color="inherit" onClick={handleLogout}>
                                            Cerrar Sesión
                                        </Button>
                                    </>
                                ) : (
                                    // SI NO ESTÁ LOGUEADO: Muestra solo Iniciar Sesión
                                    <Button color="inherit" href="/login">
                                        Iniciar Sesión
                                    </Button>
                                )}
                            </Container>
                        </Toolbar>
                    </AppBar>
                </div>
            </header>
        </Container>
    );
}