import React, { useState, useRef, useEffect } from 'react';
import './ChatWidget.css';

const ChatWidget = () => {
  const chatBodyRef = useRef(null);

  const [typing, setTyping] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi 👋! Hope you are doing great over there🤗 I’m your outfits shopping assistant based on X-Fash outfit company services,products and user support in cloths suggestiions.Am here to guide you through and help you in whichever way that I can. What product are you interested in based on types, categories,vacations, season and so on so fourth...Just chilling waiting for your response and boom😁🤗👇🏾you get your grievances articulated. ?', time: new Date(), read: true }
  ]);
  const [input, setInput] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours % 12 || 12}:${minutes < 10 ? '0' + minutes : minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      from: 'user',
      text: input,
      time: new Date(),
      read: false
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    // Smart assistant replies
    let response = '';
    const lower = input.toLowerCase();
    const pattern = /\bhow\b.*\bmake\b.*\borders\b|\bhow\b.*\borders\b.*\bmake\b|\bmake\b.*\bhow\b.*\borders\b|\borders\b.*\bmake\b.*\bhow\b/i;

    if (lower.includes('dress') || lower.includes('shirt') || lower.includes('jacket')) {
      response = 'Great choice! What quantity are you interested in?';
    } else if (input.match(/\d+/)) {
      response = 'Awesome! What’s your delivery location?';
    } else if (lower.includes('nairobi') || lower.includes('mombasa') || lower.includes('kwale') || lower.includes('kilifi') || lower.includes('tana') || lower.includes('lamu') || lower.includes('taita') || lower.includes('garissa') || lower.includes('kajiado') || lower.includes('kericho') || lower.includes('bomet') || lower.includes('kakamega') || lower.includes('vihiga') || lower.includes('bungoma') || lower.includes('busia') || lower.includes('wajir') || lower.includes('mandera') || lower.includes('marsabit') || lower.includes('isiolo') || lower.includes('meru') || lower.includes('tharaka') || lower.includes('embu') || lower.includes('kitui') || lower.includes('machakos') || lower.includes('makueni') || lower.includes('siaya') || lower.includes('kisumu') || lower.includes('homa') || lower.includes('migori') || lower.includes('kisii') || lower.includes('nyamira') || lower.includes('nyandarua') || lower.includes('nyeri') || lower.includes('kirinyaga') || lower.includes('nyandarua') || lower.includes('turkana') || lower.includes('trans') || lower.includes('nzoia') || lower.includes('pokot') || lower.includes('kiambu') || lower.includes('nithi') || lower.includes('tharakanithi') || lower.includes('bay') || lower.includes('homabay') || lower.includes('river') || lower.includes('tanariver') || lower.includes('mombasa')) {
      response = 'Thanks! A supplier will join you shortly. You can also chat with us on WhatsApp.';
    } else if (lower.includes('hi')) {
      response = 'Which Language do you prefer I Proceed with🤷🏾‍♀️ or can I proceed with Gen Z language🤷🏾‍♀️🤗 just respond with the language you prefer me to proceed with and I wil respond based on your prefered language.'
    } else if (lower.includes('how') && lower.includes('make') && lower.includes('orders')) {
      response = "Wow thats perfect question lemme guide you step by step"
    }
    else {
      response = 'Opps!!!Unfortunatelly I dont understand your response and thats my bad🤦‍♀️😒You can reach out to our Admin for more clarification actually lemme redirect you to Admin WhatsApp ';
    }
    //     if (pattern.test(input)) {
    //   response = "Wow, that's a perfect question! Let me guide you step by step.";
    // }


    setTyping(true); // Show typing dots

    setTimeout(() => {
      setTyping(false); // Hide typing dots
      setMessages(prev => [
        ...prev,
        { from: 'bot', text: response, time: new Date(), read: true }
      ]);

      // Open WhatsApp if needed
      if (response.toLowerCase().includes('whatsapp')) {
        setTimeout(() => {
          window.open('https://wa.me/254740935676?text=Hello👋%20I%20have%20been%20redirected%20to%20you%20by%20X-Fash%20Shopping%20Assistance', '_blank');
        }, 1500);
      }
    }, 3000); // Wait 3 seconds before showing bot response


    setInput('');
  };
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);


  return (
    <>
      {/* Floating Chat Icon */}
      <button className="chat-icon-button" onClick={toggleChat}>
        💬
      </button>

      {/* Chat Box */}
      {isOpen && (
        <div className="chat-widget">
          <div className="chat-widget-header">
            <h2>X-Fash Shop Assistant</h2>
            <button onClick={toggleChat} className="close-btn">❌</button>
          </div>

          <div className="chat-body" ref={chatBodyRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.from}`}>
                <div className="text">{msg.text}</div>
                <div className="meta">
                  <span>{formatTime(msg.time)}</span>
                  {msg.from === 'user' && (
                    <span className="status">{msg.read ? '✓ Read' : '✓ Sent'}</span>
                  )}
                

                </div>
                
              </div>
              
            ))}
          </div>
            {typing && (
                    <div className="typing">
                      <div className="text typing-dots">
                        <span>.</span><span>.</span><span>.</span>
                      </div>
                    </div>
                  )}

          <div className="chat-footer">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
