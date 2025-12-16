import { AppBar, Container, Toolbar, Button } from "@mui/material"; // ¡Añadir Button!
import pokedexLogo from "../assets/pokedex_logo.png";
import "./Header.css";

export default function Header() {
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
                            <Button color="inherit" href="/">Inicio</Button>
                            <Button color="inherit" href="/add-pokemon">Agregar Pokemon</Button>
                        </Container>
                        </Toolbar>
                    </AppBar>
                </div>
            </header>
        </Container>
    );
}