// Les imports :
import React from "react";
import "../SASS/connexion.css";
import "../CSS/reset.css";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faKey } from '@fortawesome/free-solid-svg-icons';

// Connection à socket :
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

const Connexion = () => {

    // Navigation :
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();

        navigate('/join-chat');
    }
    
    return (
        <>
            <div className="wrapper">

                <div className="wrapperContainer">

                    <h1 className="wrapperTitle">Connexion</h1>

                    <div className="inputBox">

                        <div className="input">
                            <div className="inputTitle">
                                <label htmlFor="#">E-mail <span>*</span></label>
                            </div>
                            <div className="inputText inputFlex">
                                <FontAwesomeIcon icon={faAt} className="inputIcon" />
                                <input type="email" />
                            </div>
                        </div>

                        <div className="input">
                            <div className="inputTitle">
                                <label htmlFor="#">Mot de passe <span>*</span></label>
                            </div>
                            <div className="inputText inputFlex">
                                <FontAwesomeIcon icon={faKey} className="inputIcon" />
                                <input type="password" />
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <button type="submit">Se connecter</button>
                        </form>

                        <Link to="/ChatHome">Test ChatHome</Link>

                    </div>

                </div>

            </div>
        </>
    )
}

export default Connexion;