import { React, useEffect, useState } from "react";
import "../CSS/reset.css";
import "../SASS/chat.css";
// import logoUser from '../Images/logouser.jpg';
import { io } from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom"


const socket = io.connect("http://localhost:3001");

const ChatHome = ({ socket, username, room }) => {

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {

        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        });

    }, [socket]);
    
    const sendMessage = () => {
        console.log(currentMessage);
        if (currentMessage !== "") {

            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };
            socket.emit("newMessage", messageData);
        }
    };


    return (
        <>
            <div className="chat">

                <div className="chatContainer">

                    <div className="chatBox">
                        <ScrollToBottom className="scrollBottom">
                            
                            {[...new Set(messageList)].map((messageContent) => {
                                return (
                                    <div className="chatContent">

                                        <div className="chatContentContainer" id={username === messageContent.author ? "me" : "others"}>
                                            <div className="chatMessageContent">{messageContent.message}</div>
                                        </div>

                                        <div className="user">
                                            <div className="time">{messageContent.time}</div>
                                            <span>•</span>
                                            <div className="author">{messageContent.author}</div>
                                        </div>
                                            
                                    </div>
                                )
                            })}
                        </ScrollToBottom>
                    </div>

                    <div className="chatInput">

                        <input type="text" placeholder="Démarrer un nouveau message" 
                                onChange={(event) => { setCurrentMessage(event.target.value) }} 
                                onKeyUp={(event) => {
                                event.key === "Enter" && sendMessage();
                            }}
                        />

                        <button onClick={sendMessage}>Envoyer</button>
                        
                    </div>
                </div>

            </div>

        </>
    )
}

export default ChatHome;