// Les imports :
import React, { useState } from "react";
import "../SASS/joinChannel.css";
import "../CSS/reset.css";

// Connection à socket :
import io from "socket.io-client";
import ChatHome from "./ChatHome";
const socket = io.connect("http://localhost:3001");

function JoinChat() {

    const [username, setUsername] = useState();
    const [room, setRoom] = useState();
    const [showChat, setShowChat] = useState(false);

    const joinRoom = () => {
        if (username !== "" && room !== "") {
            socket.emit("join_room", room);
            setShowChat(true);
        }
    };

    return (
        <>
            {!showChat ? (
                <div className="joinChat">
                    <div className="joinChatContainer">
                        <div className="joinInput">
                            <input type="text" placeholder="Entrez votre pseudo" onChange={(event) => setUsername(event.target.value)} />
                        </div>

                        <div className="joinInput">
                            <input type="text" placeholder="Room ID..." onChange={(event) => setRoom(event.target.value)} />
                        </div>
                        
                        <button type="submit" onClick={joinRoom}>Rejoindre</button>
                    </div>
                </div>
            ) : (
                <ChatHome socket={socket} username={username} room={room} />
            )}
        </>
    )

}

export default JoinChat;