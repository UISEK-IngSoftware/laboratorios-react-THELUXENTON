import { AppBar, Toolbar } from "@mui/material";
import logo from '../assets/pokedex.png';
import './header.css';

export default function Headers( ) {
        return (
        <header>
            <div className="pokedex-navbar">
                <AppBar position="static">
                    <Toolbar sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <div className="imagen-container">
                            <img src={logo} alt="Logo de la Pokedex" className="pokedex-logo" />
                        </div>

                    </Toolbar>
                </AppBar>
            </div>
        </header>
    );
}