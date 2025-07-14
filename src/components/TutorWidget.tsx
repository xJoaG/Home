import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Sparkles, Send, Minimize2, Maximize2, Zap, BookOpen, Crown, Bot, Cpu, Wifi, Brain, Monitor, Rocket, Star, Code, Terminal, Lightbulb } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'suggestion' | 'normal';
}

const TutorWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm COSMOS, your advanced C++ learning companion. I'm powered by cutting-edge AI to provide personalized guidance, code reviews, and instant help. Ready to master C++ together? 🚀",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [eyeState, setEyeState] = useState<'open' | 'blink' | 'wink'>('open');
  const [mouthState, setMouthState] = useState<'neutral' | 'speaking' | 'happy'>('neutral');
  const [isThinking, setIsThinking] = useState(false);
  const [brainActivity, setBrainActivity] = useState(0);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Enhanced AI responses for C++
  const aiResponses = [
    "Excellent question! Let me analyze the optimal C++ approach for you. 🎯",
    "I love your curiosity about C++! This concept is fundamental to modern programming. ⭐",
    "That's a fantastic C++ question! My neural networks suggest this connects to memory management... 🧠",
    "Perfect timing! This C++ topic is crucial for performance optimization. Let me break it down... 💫",
    "You're thinking like a true C++ developer! This question shows great algorithmic thinking. 🚀",
    "Brilliant! This is where many programmers have their 'aha!' moment with pointers and references... ✨",
    "I can see you're ready for advanced C++ concepts! This separates good coders from great ones... 🎓",
    "This is a key insight in C++! My learning algorithms show this will unlock new understanding... 🔑"
  ];

  const quickSuggestions = [
    "Explain pointers vs references",
    "Show me RAII examples", 
    "What's next in my C++ journey?",
    "Help me debug this code"
  ];

  // Enhanced animations with more sophisticated AI behavior
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (eyeState === 'open' && !isThinking) {
        setEyeState('blink');
        setTimeout(() => setEyeState('open'), 150);
      }
    }, 2000 + Math.random() * 3000);

    return () => clearInterval(blinkInterval);
  }, [eyeState, isThinking]);

  // Brain activity simulation
  useEffect(() => {
    const brainInterval = setInterval(() => {
      setBrainActivity(Math.random());
    }, 500);

    return () => clearInterval(brainInterval);
  }, []);

  // Mouth animation during speaking
  useEffect(() => {
    if (isTyping) {
      setMouthState('speaking');
      const speakingInterval = setInterval(() => {
        setMouthState(prev => prev === 'speaking' ? 'neutral' : 'speaking');
      }, 300);
      
      return () => clearInterval(speakingInterval);
    } else {
      setMouthState('neutral');
    }
  }, [isTyping]);

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputMessage.trim();
    if (!text) return;

    const userMessage: Message = {
      id: Date.now(),
      text,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    setIsThinking(true);
    setEyeState('open');

    // Simulate AI processing
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      setIsThinking(false);
      setMouthState('happy');
      
      // Return to neutral after speaking
      setTimeout(() => {
        setMouthState('neutral');
      }, 2000);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getEyeStyle = () => {
    switch (eyeState) {
      case 'blink':
        return 'h-0.5';
      case 'wink':
        return 'h-1';
      default:
        return 'h-2';
    }
  };

  const getMouthStyle = () => {
    switch (mouthState) {
      case 'speaking':
        return 'w-4 h-2 rounded-full';
      case 'happy':
        return 'w-4 h-1 rounded-full bg-green-400';
      default:
        return 'w-3 h-0.5 rounded-full';
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Next-Gen Chat Interface */}
      {isOpen && (
        <div className={`absolute bottom-28 right-0 mb-4 transition-all duration-500 ${
          isMinimized ? 'w-80 h-20' : 'w-96 h-[600px]'
        }`}>
          <div className="glass-morphism rounded-3xl shadow-2xl border border-white/30 h-full flex flex-col overflow-hidden relative">
            {/* Advanced gradient border effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/15 via-cyan-500/15 to-green-500/15 blur-lg -z-10"></div>
            
            {/* Enhanced Header with C++ branding */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-blue-500/10 to-green-500/10">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-cyan-500 to-green-500 flex items-center justify-center shadow-xl relative overflow-hidden">
                    {/* Neural network pattern */}
                    <div className="absolute inset-0 opacity-30">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-white rounded-full"
                          style={{
                            left: `${20 + i * 15}%`,
                            top: `${30 + (i % 2) * 40}%`,
                            animation: `pulse ${1 + i * 0.2}s ease-in-out infinite`
                          }}
                        />
                      ))}
                    </div>
                    <Brain className="h-6 w-6 text-white relative z-10" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white animate-pulse flex items-center justify-center">
                    <Code className="h-3 w-3 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl flex items-center space-x-2">
                    <span>COSMOS AI</span>
                    <Terminal className="h-5 w-5 text-cyan-400" />
                  </h3>
                  <p className="text-gray-300 text-sm flex items-center space-x-2">
                    <span>C++ Learning Companion</span>
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                      <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                >
                  {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
                    >
                      <div
                        className={`max-w-[85%] p-4 rounded-2xl ${
                          message.isUser
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                            : 'glass-morphism-dark text-white border border-white/10 shadow-xl'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.text}</p>
                        <p className="text-xs opacity-70 mt-2">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start animate-fade-in">
                      <div className="glass-morphism-dark p-4 rounded-2xl border border-white/10">
                        <div className="flex items-center space-x-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-gray-300 text-sm">COSMOS is analyzing...</span>
                          <Cpu className="h-4 w-4 text-cyan-400 animate-pulse" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Suggestions */}
                <div className="px-6 pb-4">
                  <div className="grid grid-cols-2 gap-2">
                    {quickSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSendMessage(suggestion)}
                        className="text-xs bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white px-3 py-2 rounded-lg transition-all duration-200 border border-white/10 hover:border-white/20 flex items-center space-x-1"
                      >
                        <Code className="h-3 w-3" />
                        <span>{suggestion}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Enhanced Input Area */}
                <div className="p-6 border-t border-white/10 bg-gradient-to-r from-blue-500/5 to-green-500/5">
                  <div className="flex space-x-3">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask COSMOS about C++ concepts..."
                      className="flex-1 input-field text-sm"
                    />
                    <button
                      onClick={() => handleSendMessage()}
                      disabled={!inputMessage.trim()}
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 hover:from-blue-600 hover:to-cyan-600 transition-all duration-200"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Revolutionary AI Avatar */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-20 h-20 cursor-pointer transition-all duration-500 hover:scale-110 group"
      >
        {/* Main Avatar Body with advanced design */}
        <div className="relative w-full h-full bg-gradient-to-br from-blue-600 via-cyan-600 to-green-600 rounded-2xl shadow-2xl border-2 border-white/20 overflow-hidden">
          
          {/* Neural network background */}
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${10 + (i % 4) * 25}%`,
                  top: `${15 + Math.floor(i / 4) * 25}%`,
                  animation: `pulse ${1 + (i * 0.1)}s ease-in-out infinite`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
            {/* Connecting lines */}
            <svg className="absolute inset-0 w-full h-full">
              <line x1="20%" y1="20%" x2="45%" y2="45%" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
              <line x1="45%" y1="20%" x2="70%" y2="45%" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
              <line x1="20%" y1="45%" x2="45%" y2="70%" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
              <line x1="45%" y1="45%" x2="70%" y2="70%" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            </svg>
          </div>
          
          {/* Face Container */}
          <div className="absolute inset-2 bg-gradient-to-br from-blue-900/60 to-green-900/60 rounded-xl border border-white/20 flex flex-col items-center justify-center">
            
            {/* Eyes with advanced animation */}
            <div className="flex space-x-2 mb-2">
              <div className={`w-2 ${getEyeStyle()} bg-cyan-400 rounded-full transition-all duration-150 ${isThinking ? 'animate-pulse' : ''} shadow-lg shadow-cyan-400/50`}></div>
              <div className={`w-2 ${getEyeStyle()} bg-cyan-400 rounded-full transition-all duration-150 ${isThinking ? 'animate-pulse' : ''} shadow-lg shadow-cyan-400/50`}></div>
            </div>
            
            {/* Mouth with enhanced design */}
            <div className={`${getMouthStyle()} bg-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-400/50`}></div>

            {/* Brain activity indicator */}
            {isThinking && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div>
                <div className="absolute w-6 h-6 border-2 border-green-400/30 border-t-green-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
              </div>
            )}

            {/* Happy particles */}
            {mouthState === 'happy' && (
              <>
                <Sparkles className="absolute top-1 left-1 w-2 h-2 text-yellow-300 animate-bounce" />
                <Star className="absolute top-1 right-1 w-2 h-2 text-cyan-300 animate-bounce" style={{ animationDelay: '200ms' }} />
                <Code className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 text-green-300 animate-bounce" style={{ animationDelay: '400ms' }} />
              </>
            )}
          </div>

          {/* Status indicators */}
          <div className="absolute bottom-1 left-1 w-1 h-2 bg-green-400 rounded-full opacity-80 animate-pulse"></div>
          <div className="absolute bottom-1 right-1 w-1 h-2 bg-blue-400 rounded-full opacity-80 animate-pulse" style={{ animationDelay: '500ms' }}></div>
          
          {/* Processing lights */}
          {isThinking && (
            <>
              <div className="absolute left-0 top-1/2 w-0.5 h-3 bg-cyan-400/60 rounded-full animate-pulse"></div>
              <div className="absolute right-0 top-1/2 w-0.5 h-3 bg-cyan-400/60 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
              <div className="absolute top-0 left-1/2 w-3 h-0.5 bg-green-400/60 rounded-full animate-pulse" style={{ animationDelay: '600ms' }}></div>
            </>
          )}

          {/* Glass morphism overlay */}
          <div className="absolute inset-2 rounded-xl bg-gradient-to-t from-transparent via-white/5 to-white/10 pointer-events-none"></div>
        </div>

        {/* Notification indicator */}
        {!isOpen && (
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-red-400 to-pink-500 rounded-full animate-ping shadow-xl">
            <div className="absolute inset-0 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-600 rounded-full animate-pulse"></div>
            <div className="absolute inset-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
              <MessageCircle size={10} className="text-red-500" />
            </div>
          </div>
        )}

        {/* Enhanced hover glow effect */}
        <div className="absolute inset-0 rounded-2xl border-2 border-cyan-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
        
        {/* Ambient glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 via-cyan-400/20 to-green-400/20 blur-xl opacity-50 animate-pulse -z-10"></div>
        
        {/* Brain activity visualization */}
        <div 
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/10 to-green-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ opacity: brainActivity * 0.3 }}
        ></div>
      </div>
    </div>
  );
};

export default TutorWidget;