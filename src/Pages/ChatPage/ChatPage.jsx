

import React, { useContext, useEffect, useRef, useState } from "react";
import { StoreContext } from "../../Context/StoreContext";
import EmojiPicker from "emoji-picker-react";
import { ReactMediaRecorder } from "react-media-recorder";
import { assets } from "../../Assets/assets";
import UserAvatar from "../../Components/UserAvatar/UserAvatar";

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

    // Track the message being replied to
    const [replyTo, setReplyTo] = useState(null);






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
        socketRef.current = io(import.meta.env.VITE_SOCKET_URL || url, {
            transports: ["websocket"], // Ensure WebSocket transport
        });

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

        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/message/${user._id}/${chatUser._id}`);
            setMessages(res.data.messages);
        } catch (error) {
            console.error("⚠️ Failed to fetch messages:", error.message);
            setMessages([]); // Prevent crash if 404
        }

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

            replyTo: replyTo ? { _id: replyTo._id, message: replyTo.message } : null,

        };

        setReplyTo(null); // ✅ Clear reply state


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
                <div className="user-list-scroll">
                    {allUsers.length === 0 && <div className="empty-chat">No users found</div>}
                    {allUsers.map((u) => (
                        <div
                            key={u._id}
                            className={`chat-user ${currentChat?._id === u._id ? "active" : ""}`}
                            onClick={() => selectChat(u)}
                        >
                            <div className="chat-user-left">
                                <UserAvatar name={u.name} size={40} />
                                <div className="user-info">
                                    <span className="user-name">{u.name}</span>
                                    {onlineUsers.includes(u._id) && <span className="online-dot" />}
                                </div>
                            </div>

                            {unread[u._id] > 0 && (
                                <div className="chat-user-right">
                                    <span className="unread-badge">{unread[u._id]}</span>
                                </div>
                            )}
                        </div>

                    ))}
                </div>

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

                                    // ✅ Swipe to reply
                                    onTouchStart={(e) => (e.target.startX = e.changedTouches[0].clientX)}
                                    onTouchEnd={(e) => {
                                        const endX = e.changedTouches[0].clientX;
                                        if (endX - e.target.startX > 75) setReplyTo(msg); // Swipe right
                                    }}
                                >
                                    {/* ✅ Show reply reference */}
                                    {msg.replyTo && (
                                        <div className="reply-preview">
                                            <small>Replying to: {msg.replyTo.message}</small>
                                        </div>
                                    )}
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
                {replyTo && (
                    <div className="replying-box">
                        <span>Replying to: {replyTo.message}</span>
                        <button onClick={() => setReplyTo(null)}>❌</button>
                    </div>
                )}
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
                                        <img src={assets.microphone} alt="" className="mic" />
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
