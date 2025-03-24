import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { FaMapMarkedAlt, FaTimes } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import { io } from 'socket.io-client';
import { useAuth } from '../../context/AuthContext';
import ChatMap from './ChatMap';
import './ChatBot.css';

const ChatBot = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const messagesEndRef = useRef(null);
  const { user } = useAuth();
  const userType = localStorage.getItem('userType');

  // Initialize socket connection
  useEffect(() => {
    try {
      const newSocket = io("https://my-fullstack-app-5.onrender.com");
      setSocket(newSocket);
      
      return () => {
        if (newSocket) newSocket.disconnect();
      };
    } catch (err) {
      console.error("Socket connection error:", err);
    }
  }, []);

  // Handle real-time messages
  useEffect(() => {
    if (socket) {
      socket.on('receive_message', (message) => {
        if (
          selectedUser && 
          user && 
          (message.senderId === selectedUser?._id || message.senderId === user._id)
        ) {
          setMessages(prev => [...prev, message]);
        }
      });
    }
    
    return () => {
      if (socket) {
        socket.off('receive_message');
      }
    };
  }, [socket, selectedUser, user]);

  // Fetch users
  useEffect(() => {
    if (user) {
      fetchUsers();
    }
  }, [user]);

  // Fetch messages when user selected
  useEffect(() => {
    if (selectedUser) {
      fetchMessages();
    }
  }, [selectedUser]);

  // Auto scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      console.log("Fetching users with userType:", userType);
      
      const token = localStorage.getItem('token');
      const response = await axios.get(
        "https://my-fullstack-app-5.onrender.com/api/chat/users",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            userType: userType === "true" ? "buyer" : "farmer", // true means buyer, false means farmer
            userId: user?._id || user?.id,
          },
        }
      );

      console.log("Users response:", response.data);

      if (response.data.success) {
        setUsers(response.data.users);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      if (!user || !selectedUser) {
        console.log("Missing user or selectedUser:", { user, selectedUser });
        return;
      }

      console.log("Fetching messages between users:", {
        currentUser: user._id || user.id,
        selectedUser: selectedUser._id
      });

      const token = localStorage.getItem('token');
      const userId = user._id || user.id; // Handle both _id and id properties

      const response = await axios.get(
        "https://my-fullstack-app-5.onrender.com/api/chat/messages",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            senderId: userId,
            receiverId: selectedUser._id,
          },
        }
      );

      console.log("Messages response:", response.data);

      if (response.data.success) {
        setMessages(response.data.messages);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Failed to load messages');
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser) return;

    // Clear any previous errors
    setError(null);
    
    // Make sure we have the current user ID
    if (!user || (!user._id && !user.id)) {
      setError('User information is missing. Please log in again.');
      return;
    }
    
    const userId = user._id || user.id; // Handle both _id and id properties
    
    // Store message locally before sending
    const tempMessage = {
      _id: Date.now().toString(), // Temporary ID
      senderId: userId,
      receiverId: selectedUser._id,
      content: newMessage.trim(),
      timestamp: new Date(),
      isSending: true // Flag to indicate message is being sent
    };
    
    // Add to messages array immediately for better UX
    setMessages(prev => [...prev, tempMessage]);
    
    // Clear input field
    const messageContent = newMessage.trim();
    setNewMessage('');

    try {
      console.log("Current user:", user);
      console.log("Selected user:", selectedUser);
      
      const token = localStorage.getItem('token');
      const messageData = {
        senderId: userId,
        receiverId: selectedUser._id,
        content: messageContent,
        senderType: userType === 'farmer' ? 'farmer' : 'buyer',
        receiverType: selectedUser.userType
      };

      console.log("Sending message data:", messageData);

      const response = await axios.post(
        "https://my-fullstack-app-5.onrender.com/api/chat/send",
        messageData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Message send response:", response.data);

      if (response.data.success) {
        // Update the temporary message with server data
        setMessages(prev => 
          prev.map(msg => 
            msg._id === tempMessage._id 
              ? {...response.data.message, isSending: false} 
              : msg
          )
        );

        // Emit message through socket
        if (socket) {
          socket.emit('send_message', response.data.message);
        }
      } else {
        // Handle API error with success: false
        setError(response.data.message || 'Failed to send message');
        
        // Remove the temporary message
        setMessages(prev => prev.filter(msg => msg._id !== tempMessage._id));
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again.');
      
      // Remove the temporary message
      setMessages(prev => prev.filter(msg => msg._id !== tempMessage._id));
    }
  };

  return (
    <div className="flex h-screen">
      {/* Users list */}
      <div className="w-1/4 bg-gray-100 users-list">
        <h2 className="p-4 text-xl font-bold border-b">Chats</h2>
        {loading ? (
          <div className="p-4">Loading users...</div>
        ) : error ? (
          <div className="p-4 text-red-500">{error}</div>
        ) : (
          <div className="overflow-y-auto">
            {Array.isArray(users) && users.length > 0 ? (
              users.map((chatUser) => (
                <motion.div
                  key={chatUser._id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 cursor-pointer hover:bg-gray-50 ${
                    selectedUser?._id === chatUser._id ? 'bg-gray-100' : ''
                  }`}
                  onClick={() => setSelectedUser(chatUser)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {chatUser.image ? (
                        <img
                          src={chatUser.image}
                          alt={chatUser.name}
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                          {chatUser.name && chatUser.name[0]}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{chatUser.name || "Unknown"}</div>
                      <div className="text-sm text-gray-500">{chatUser.userType || "User"}</div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="p-4 text-gray-500">No users available</div>
            )}
          </div>
        )}
      </div>

      {/* Chat area */}
      <div className="w-3/4 flex flex-col chat-container">
        {/* Chat Header */}
        <div className="p-4 border-b">
          {selectedUser && (
            <div className="flex items-center">
              <img
                src={selectedUser.image || 'default-avatar.png'}
                alt="Profile"
                className="w-10 h-10 rounded-full mr-3"
              />
              <span className="font-semibold">{selectedUser.name}</span>
            </div>
          )}
        </div>

        {/* Messages Area */}
        <div className="flex-1 p-4 overflow-y-auto chat-container">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message-container-${
                message.sender === user._id ? 'sent' : 'received'
              }`}
            >
              <div
                className={`message ${
                  message.sender === user._id ? 'message-sent' : 'message-received'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t">
          <div className="flex">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border rounded-l-lg p-2 focus:outline-none focus:border-green-500"
            />
            <button
              onClick={handleSendMessage}
              className="bg-green-500 text-white px-6 py-2 rounded-r-lg hover:bg-green-600"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;