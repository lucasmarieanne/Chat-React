import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Connexion from './components/Connexion';
import ChatHome from './components/ChatHome';
import JoinChat from "./components/JoinChat";
import CreateChanel from "./components/CreateChannel";


const App = () => {
    return (
        <>
            <div className="App">
                <Router>
                    <Routes>
                        <Route path="/connexion" element={<Connexion />} />
                        <Route path="/chat-home" element={<ChatHome />} />
                        <Route path="/join-chat" element={<JoinChat />} />
                        <Route path="/create-channel" element={<CreateChanel />} />
                    </Routes>
                </Router>
            </div>
        </>
    )
}

export default App;