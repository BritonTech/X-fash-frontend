// import React, { useContext, useEffect, useRef, useState } from "react";
// import { StoreContext } from "../../Context/StoreContext";
// import { io } from "socket.io-client";
// import axios from "axios";
// import "./ChatPage.css";

// const ChatPage = () => {
//     const { user, url, token, loadingUser } = useContext(StoreContext);
//     const [allUsers, setAllUsers] = useState([]);
//     const [onlineUsers, setOnlineUsers] = useState([]);
//     const [currentChat, setCurrentChat] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [messageText, setMessageText] = useState("");
//     const [typingStatus, setTypingStatus] = useState("");
//     const [unread, setUnread] = useState({});
//     const socketRef = useRef();

//     //   if (loadingUser) {
//     //   return <div className="chat-loading">Loading user...</div>;
//     // }

//     // if (!user || !user._id) {
//     //   return <div className="chat-login-required">Please login to access chat.</div>;
//     // }

//     const messageEndRef = useRef(null);

//     // useEffect(() => {
//     //     // Fetch users (excluding current user)
//     //     const fetchUsers = async () => {
//     //         //   const res = await axios.get(`${url}/api/user/all`);
//     //         const res = await axios.get(`${url}/api/user/all`, {
//     //             headers: {
//     //                 token: token,
//     //             },
//     //         });

//     //         const filtered = res.data.users.filter((u) => u._id !== user?._id);
//     //         setAllUsers(filtered);
//     //         // setAllUsers(res.data.users); // Show all users (including yourself)
//     //     };
//     //     fetchUsers();
//     // }, [user, url]);
//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const res = await axios.get(`${url}/api/user/all`, {
//                     headers: {
//                         token: token,
//                     },
//                 });
//                 console.log("Fetched users:", res.data.users);
//                 const filtered = res.data.users.filter((u) => u._id !== user?._id);
//                 setAllUsers(filtered);
//             } catch (error) {
//                 console.error("Error fetching users:", error);
//             }
//         };
//         if (user && token) fetchUsers();
//     }, [user, token, url]);


//     useEffect(() => {
//         socketRef.current = io(url);
//         socketRef.current.emit("add-user", user?._id);

//         socketRef.current.on("online-users", (users) => {
//             setOnlineUsers(users);
//         });

//         socketRef.current.on("receive-msg", (data) => {
//             if (currentChat?._id === data.senderId) {
//                 setMessages((prev) => [...prev, data]);
//             } else {
//                 setUnread((prev) => ({
//                     ...prev,
//                     [data.senderId]: (prev[data.senderId] || 0) + 1,
//                 }));
//             }
//         });

//         socketRef.current.on("typing", ({ from }) => {
//             setTypingStatus(`${from} is typing...`);
//         });

//         socketRef.current.on("stop-typing", () => setTypingStatus(""));

//         return () => socketRef.current.disconnect();
//     }, [user, currentChat]);

//     const selectChat = async (chatUser) => {
//         setCurrentChat(chatUser);
//         setTypingStatus("");
//         setUnread((prev) => {
//             const updated = { ...prev };
//             delete updated[chatUser._id];
//             return updated;
//         });

//         const res = await axios.get(`${url}/api/message/${user._id}/${chatUser._id}`);
//         setMessages(res.data.messages);
//     };

//     const sendMessage = () => {
//         if (!messageText.trim()) return;

//         const data = {
//             senderId: user._id,
//             receiverId: currentChat._id,
//             message: messageText,
//             time: new Date(),
//         };

//         socketRef.current.emit("send-msg", data);
//         setMessages((prev) => [...prev, data]);
//         setMessageText("");
//         socketRef.current.emit("stop-typing", {
//             to: currentChat._id,
//             from: user.name,
//         });
//     };

//     const handleTyping = (e) => {
//         setMessageText(e.target.value);
//         socketRef.current.emit("typing", {
//             to: currentChat._id,
//             from: user.name,
//         });
//     };

//     useEffect(() => {
//         messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, [messages]);

//     return (
//         <div className="chat-container">
//             <div className="chat-sidebar">
//                 <h2>Chats</h2>
//                 {allUsers.map((u) => (
//                     <div
//                         key={u._id}
//                         className={`chat-user ${currentChat?._id === u._id ? "active" : ""}`}
//                         onClick={() => selectChat(u)}
//                     >
//                         <span>{u.name}</span>
//                         {onlineUsers.includes(u._id) && <span className="online-dot"></span>}
//                         {unread[u._id] && <span className="unread-badge">{unread[u._id]}</span>}
//                     </div>
//                 ))}
//             </div>

//             <div className="chat-main">
//                 {currentChat ? (
//                     <>
//                         <div className="chat-header">
//                             <h3>{currentChat.name}</h3>
//                         </div>
//                         <div className="chat-messages">
//                             {messages.map((msg, idx) => (
//                                 <div
//                                     key={idx}
//                                     className={`message-bubble ${msg.senderId === user._id ? "sent" : "received"}`}
//                                 >
//                                     <div>{msg.message}</div>
//                                     <span className="timestamp">
//                                         {new Date(msg.time).toLocaleString()}
//                                     </span>
//                                 </div>
//                             ))}
//                             {typingStatus && <div className="typing">{typingStatus}</div>}
//                             <div ref={messageEndRef}></div>
//                         </div>
//                         <div className="chat-input">
//                             <input
//                                 type="text"
//                                 placeholder="Type a message..."
//                                 value={messageText}
//                                 onChange={handleTyping}
//                                 onBlur={() =>
//                                     socketRef.current.emit("stop-typing", {
//                                         to: currentChat._id,
//                                         from: user.name,
//                                     })
//                                 }
//                             />
//                             <button onClick={sendMessage}>Send</button>
//                         </div>
//                     </>
//                 ) : (
//                     <div className="empty-chat">Select a user to start chatting</div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ChatPage;

// // import React, { useContext, useEffect, useRef, useState } from "react";
// // import { StoreContext } from "../../Context/StoreContext";
// // import { io } from "socket.io-client";
// // import axios from "axios";
// // import "./ChatPage.css";

// // const ChatPage = () => {
// //   const { user, url, token } = useContext(StoreContext);

// //   const [allUsers, setAllUsers] = useState([]);
// //   const [onlineUsers, setOnlineUsers] = useState([]);
// //   const [currentChat, setCurrentChat] = useState(null);
// //   const [messages, setMessages] = useState([]);
// //   const [messageText, setMessageText] = useState("");
// //   const [typingStatus, setTypingStatus] = useState("");
// //   const [unread, setUnread] = useState({});

// //   const socketRef = useRef();
// //   const messageEndRef = useRef(null);

// //   // Redirect if not logged in
// //   if (!user || !user._id) {
// //     return <div className="chat-loading">Please log in to access chat</div>;
// //   }

// //   // Fetch all users except current
// //   useEffect(() => {
// //     const fetchUsers = async () => {
// //       try {
// //         const res = await axios.get(`${url}/api/user/all`, {
// //           headers: { token },
// //         });
// //         const filtered = res.data.users.filter((u) => u._id !== user._id);
// //         setAllUsers(filtered);
// //       } catch (error) {
// //         console.error("Failed to load users", error);
// //       }
// //     };
// //     fetchUsers();
// //   }, [user, url, token]);

// //   // Setup socket
// //   useEffect(() => {
// //     socketRef.current = io(url);
// //     socketRef.current.emit("add-user", user._id);

// //     socketRef.current.on("online-users", (users) => {
// //       setOnlineUsers(users);
// //     });

// //     socketRef.current.on("receive-msg", (data) => {
// //       if (currentChat && currentChat._id === data.chatId) {
// //         setMessages((prev) => [...prev, data]);
// //       } else {
// //         setUnread((prev) => ({
// //           ...prev,
// //           [data.senderId]: (prev[data.senderId] || 0) + 1,
// //         }));
// //       }
// //     });

// //     socketRef.current.on("typing", ({ from }) => {
// //       setTypingStatus(`${from} is typing...`);
// //     });

// //     socketRef.current.on("stop-typing", () => setTypingStatus(""));

// //     return () => socketRef.current.disconnect();
// //   }, [user, currentChat, url]);

// //   const selectChat = async (otherUser) => {
// //     try {
// //       setTypingStatus("");
// //       setUnread((prev) => {
// //         const updated = { ...prev };
// //         delete updated[otherUser._id];
// //         return updated;
// //       });

// //       const res = await axios.post(
// //         `${url}/api/chat/access`,
// //         { userId: otherUser._id },
// //         { headers: { token } }
// //       );
// //       const chat = res.data.chat;
// //       setCurrentChat(chat);

// //       const messageRes = await axios.get(`${url}/api/message/${chat._id}`, {
// //         headers: { token },
// //       });
// //       setMessages(messageRes.data);
// //     } catch (error) {
// //       console.error("Failed to load chat", error);
// //     }
// //   };

// //   const sendMessage = async () => {
// //     if (!messageText.trim()) return;
// //     const newMsg = {
// //       senderId: user._id,
// //       chatId: currentChat._id,
// //       message: messageText,
// //       time: new Date(),
// //     };

// //     socketRef.current.emit("send-msg", newMsg);
// //     setMessages((prev) => [...prev, newMsg]);
// //     setMessageText("");
// //     socketRef.current.emit("stop-typing", {
// //       to: currentChat.users.find((u) => u._id !== user._id)._id,
// //       from: user.name,
// //     });
// //   };

// //   const handleTyping = (e) => {
// //     setMessageText(e.target.value);
// //     socketRef.current.emit("typing", {
// //       to: currentChat.users.find((u) => u._id !== user._id)._id,
// //       from: user.name,
// //     });
// //   };

// //   useEffect(() => {
// //     messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //   }, [messages]);

// //   return (
// //     <div className="chat-container">
// //       <div className="chat-sidebar">
// //         <h2>Chats</h2>
// //         {allUsers.map((u) => (
// //           <div
// //             key={u._id}
// //             className={`chat-user ${
// //               currentChat && currentChat.users.some((cu) => cu._id === u._id)
// //                 ? "active"
// //                 : ""
// //             }`}
// //             onClick={() => selectChat(u)}
// //           >
// //             <span>{u.name}</span>
// //             {onlineUsers.includes(u._id) && <span className="online-dot"></span>}
// //             {unread[u._id] && (
// //               <span className="unread-badge">{unread[u._id]}</span>
// //             )}
// //           </div>
// //         ))}
// //       </div>

// //       <div className="chat-main">
// //         {currentChat ? (
// //           <>
// //             <div className="chat-header">
// //               <h3>
// //                 {
// //                   currentChat.users.find((u) => u._id !== user._id)?.name
// //                 }
// //               </h3>
// //             </div>

// //             <div className="chat-messages">
// //               {messages.map((msg, idx) => (
// //                 <div
// //                   key={idx}
// //                   className={`message-bubble ${
// //                     msg.senderId === user._id || msg.sender?._id === user._id
// //                       ? "sent"
// //                       : "received"
// //                   }`}
// //                 >
// //                   <div>{msg.message || msg.content}</div>
// //                   <span className="timestamp">
// //                     {new Date(msg.createdAt || msg.time).toLocaleString()}
// //                   </span>
// //                 </div>
// //               ))}
// //               {typingStatus && <div className="typing">{typingStatus}</div>}
// //               <div ref={messageEndRef}></div>
// //             </div>

// //             <div className="chat-input">
// //               <input
// //                 type="text"
// //                 placeholder="Type a message..."
// //                 value={messageText}
// //                 onChange={handleTyping}
// //                 onBlur={() =>
// //                   socketRef.current.emit("stop-typing", {
// //                     to: currentChat.users.find((u) => u._id !== user._id)._id,
// //                     from: user.name,
// //                   })
// //                 }
// //               />
// //               <button onClick={sendMessage}>Send</button>
// //             </div>
// //           </>
// //         ) : (
// //           <div className="empty-chat">Select a user to start chatting</div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ChatPage;

import React, { useContext, useEffect, useRef, useState } from "react";
import { StoreContext } from "../../Context/StoreContext";
import EmojiPicker from "emoji-picker-react";
import { ReactMediaRecorder } from "react-media-recorder";
import { assets } from "../../Assets/assets";

import { io } from "socket.io-client";
import axios from "axios";
import "./ChatPage.css";

const ChatPage = () => {
    const { user, url, token, loadingUser } = useContext(StoreContext);
    const [allUsers, setAllUsers] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState("");
    const [typingStatus, setTypingStatus] = useState("");
    const [unread, setUnread] = useState({});
    const socketRef = useRef();
    const messageEndRef = useRef();
    const fileInputRef = useRef();

    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreviewUrl, setFilePreviewUrl] = useState(null);

    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);





    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/all`, {
                    headers: {
                        token,
                    },
                });
                const filtered = res.data.users.filter((u) => u._id !== user?._id);
                setAllUsers(filtered);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        if (user && token) fetchUsers();
    }, [user, token, url]);

    useEffect(() => {
        socketRef.current = io(url);
        if (user?._id) socketRef.current.emit("add-user", user._id);

        socketRef.current.on("online-users", (users) => {
            setOnlineUsers(users);
        });

        socketRef.current.on("receive-msg", (data) => {
            if (currentChat?._id === data.senderId) {
                setMessages((prev) => [...prev, data]);
            } else {
                setUnread((prev) => ({
                    ...prev,
                    [data.senderId]: (prev[data.senderId] || 0) + 1,
                }));
            }
        });

        socketRef.current.on("typing", ({ from }) => {
            setTypingStatus(`${from} is typing...`);
        });

        socketRef.current.on("stop-typing", () => setTypingStatus(""));

        return () => socketRef.current.disconnect();
    }, [user, currentChat]);

    const selectChat = async (chatUser) => {
        if (window.innerWidth <= 768) setSidebarOpen(false);
        setCurrentChat(chatUser);
        setTypingStatus("");
        setUnread((prev) => {
            const updated = { ...prev };
            delete updated[chatUser._id];
            return updated;
        });

        const res = await axios.get(`${import.meta.env.VITE_API_URL}/message/${user._id}/${chatUser._id}`);
        setMessages(res.data.messages);
    };

    const sendMessage = async () => {
        if (!messageText.trim() && !selectedFile) return;

        let fileUrl = null;
        let fileType = null;

        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);

            try {
                setUploading(true);
                setUploadProgress(0);

                const uploadRes = await axios.post(`${import.meta.env.VITE_API_URL}/message/upload`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        token,
                    },
                    onUploadProgress: (progressEvent) => {
                        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress(percent);
                    },
                });

                fileUrl = uploadRes.data.fileUrl;
                fileType = selectedFile.type;
            } catch (err) {
                console.error("Upload failed", err);
                alert("File upload failed. Try again.");
                setUploading(false);
                return;
            }

            setUploading(false);
            setUploadProgress(0);
        }

        const data = {
            senderId: user._id,
            receiverId: currentChat._id,
            message: messageText,
            time: new Date(),
            fileUrl,
            fileType,
        };

        socketRef.current.emit("send-msg", data);
        setMessages((prev) => [...prev, data]);
        setMessageText("");
        setSelectedFile(null);
        setFilePreviewUrl(null);
        setUploading(false);
        socketRef.current.emit("stop-typing", {
            to: currentChat._id,
            from: user.name,
        });
    };



    const handleTyping = (e) => {
        setMessageText(e.target.value);
        socketRef.current.emit("typing", {
            to: currentChat._id,
            from: user.name,
        });
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const allowedTypes = ["image/jpeg", "image/png", "image/gif", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

        if (!allowedTypes.includes(file.type)) {
            alert("Unsupported file type. Allowed: images, PDFs, Word Docs.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("File too large. Max size is 5MB.");
            return;
        }

        setSelectedFile(file);

        if (file.type.startsWith("image/")) {
            const preview = URL.createObjectURL(file);
            setFilePreviewUrl(preview);
        } else {
            setFilePreviewUrl(null);
        }
    };



    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="chat-container">
            <div className={`chat-sidebar ${sidebarOpen ? 'open' : ''}`}>
                <h2>Chats</h2>
                {allUsers.length === 0 && <div className="empty-chat">No users found</div>}
                {allUsers.map((u) => (
                    <div
                        key={u._id}
                        className={`chat-user ${currentChat?._id === u._id ? "active" : ""}`}
                        onClick={() => selectChat(u)}
                    >
                        <span>{u.name}</span>
                        {onlineUsers.includes(u._id) && <span className="online-dot"></span>}
                        {unread[u._id] && <span className="unread-badge">{unread[u._id]}</span>}
                    </div>
                ))}
            </div>
            <button className="sidebar-toggle" onClick={() => setSidebarOpen(prev => !prev)}>
                ☰
            </button>

            <div className="chat-main">
                {currentChat ? (
                    <>
                        <div className="chat-header">
                            <h3>{currentChat.name}</h3>
                        </div>
                        <div className="chat-messages">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`message-bubble ${msg.senderId === user._id ? "sent" : "received"}`}
                                >
                                    {msg.message && <div>{msg.message}</div>}

                                    {/* Show image if present */}
                                    {msg.fileUrl && msg.fileType?.startsWith("image/") && (
                                        <img src={msg.fileUrl} alt="sent-img" className="chat-image" />
                                    )}

                                    {/* Show file if not image */}
                                    {msg.fileUrl && !msg.fileType?.startsWith("image/") && (
                                        <a href={msg.fileUrl} target="_blank" rel="noopener noreferrer" className="file-link">
                                            📄 {msg.fileUrl.split("/").pop()}
                                        </a>
                                    )}

                                    <span className="timestamp">
                                        {new Date(msg.time).toLocaleString()}
                                    </span>
                                </div>
                            ))}

                            {typingStatus && <div className="typing">{typingStatus}</div>}
                            <div ref={messageEndRef}></div>
                        </div>


                    </>
                ) : (
                    <div className="empty-chat">Select a user to start chatting</div>
                )}

                {/* Updated Chat Input Section */}
                <div className="chat-input-bar">
                    <label className="attach-label" onClick={() => fileInputRef.current.click()}>
                        📎
                    </label>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileSelect}
                    />
                    <div className="emoji-picker-container">
                        <button onClick={() => setShowEmojiPicker((prev) => !prev)} className="emoji-toggle">
                            😀
                        </button>

                        {showEmojiPicker && (
                            <div className="emoji-panel">
                                <EmojiPicker
                                    onEmojiClick={(emojiData) =>
                                        setMessageText((prev) => prev + emojiData.emoji)
                                    }
                                    theme={darkMode ? "dark" : "light"}
                                    height={350}
                                />
                            </div>
                        )}
                    </div>

                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={messageText}
                        onChange={handleTyping}
                        onBlur={() =>
                            socketRef.current.emit("stop-typing", {
                                to: currentChat._id,
                                from: user.name,
                            })
                        }
                        className="text-input"
                    />
                    <ReactMediaRecorder
                        audio
                        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                            <div className="audio-controls">
                                {status !== "recording" ? (
                                    <button onClick={startRecording} className="audio-input">
                                        <img src={assets.microphone} alt="" className="mic"/>
                                    </button>
                                ) : (
                                    <button onClick={stopRecording}>⏹️</button>
                                )}

                                {mediaBlobUrl && (
                                    <audio controls src={mediaBlobUrl} className="audio-preview" />
                                )}

                                {mediaBlobUrl && (
                                    <button
                                        onClick={async () => {
                                            const blob = await fetch(mediaBlobUrl).then((r) => r.blob());
                                            const file = new File([blob], "audio-message.mp3", { type: "audio/mpeg" });
                                            setSelectedFile(file);
                                            setFilePreviewUrl(null); // don't show preview
                                        }}
                                    >
                                        ✅ Use
                                    </button>
                                )}
                            </div>
                        )}
                    />

                    {selectedFile && (
                        <div className="file-preview">
                            {filePreviewUrl ? (
                                <img src={filePreviewUrl} alt="preview" className="preview-image" />
                            ) : (
                                <div className="file-name">📄 {selectedFile.name}</div>
                            )}
                        </div>
                    )}
                    {uploading && (
                        <div className="upload-progress">
                            Uploading: {uploadProgress}%
                            <div className="progress-bar">
                                <div className="progress" style={{ width: `${uploadProgress}%` }}></div>
                            </div>
                        </div>
                    )}


                    <button onClick={sendMessage} className="send-btn" disabled={uploading}>
                        {uploading ? "Uploading..." : "➤"}
                    </button>

                </div>
            </div>
        </div>
    );
};

export default ChatPage;
