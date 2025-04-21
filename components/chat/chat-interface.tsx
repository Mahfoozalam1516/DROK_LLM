"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";
import { useChat } from "@/hooks/use-chat";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";

export function ChatInterface() {
  const {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    streamingMessage,
    sendMessage,
    resetChat,
  } = useChat();
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, streamingMessage]);
  
  // Welcome message
  const hasMessages = messages.length > 0 || streamingMessage;
  
  return (
    <div className="flex flex-col h-full">
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {!hasMessages && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-6 my-12"
            >
              <h2 className="text-2xl font-bold">Welcome to DigiRocket AI Assistant</h2>
              <p className="text-muted-foreground">
                Ask about digital marketing, web development, branding, or specialized services like 
                AI tools and dropshipping. Get tailored, data-driven solutions to grow your business.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto mt-6">
                {[
                  "How can DigiRocket improve my e-commerce SEO?",
                  "What social media marketing strategies do you recommend?",
                  "Tell me about your web development services",
                  "How can I boost my brand's online presence?"
                ].map((suggestion, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    className="justify-start h-auto py-3 px-4 text-left"
                    onClick={() => {
                      setInputValue(suggestion);
                      sendMessage(suggestion);
                    }}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </motion.div>
          )}
          
          {/* Message List */}
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              role={message.role}
              content={message.content}
            />
          ))}
          
          {/* Streaming Message */}
          {streamingMessage && (
            <ChatMessage
              role="assistant"
              content={streamingMessage}
              isStreaming={true}
            />
          )}
          
          {/* Invisible element to scroll to */}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      {/* Chat Actions */}
      {hasMessages && (
        <div className="flex justify-center p-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs"
            onClick={resetChat}
          >
            <RefreshCcw className="mr-1 h-3 w-3" />
            Reset conversation
          </Button>
        </div>
      )}
      
      {/* Input Area */}
      <div className="p-4 border-t">
        <div className="max-w-3xl mx-auto">
          <ChatInput
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onSubmit={sendMessage}
            isDisabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
}