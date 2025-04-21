"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";
import { motion } from "framer-motion";

type MessageRole = "user" | "assistant";

interface ChatMessageProps {
  role: MessageRole;
  content: string;
  isStreaming?: boolean;
}

export function ChatMessage({ role, content, isStreaming = false }: ChatMessageProps) {
  const isUser = role === "user";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex gap-3",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {/* Avatar for assistant */}
      {!isUser && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Bot size={18} className="text-primary" />
        </div>
      )}
      
      {/* Message content */}
      <Card
        className={cn(
          "px-4 py-3 max-w-[80%]",
          isUser 
            ? "bg-primary text-primary-foreground" 
            : "bg-card"
        )}
      >
        <div className="prose prose-sm dark:prose-invert">
          {isStreaming ? (
            <>
              {content}
              <TypewriterDots />
            </>
          ) : (
            formatMessage(content)
          )}
        </div>
      </Card>
      
      {/* Avatar for user */}
      {isUser && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center">
          <User size={18} className="text-primary-foreground" />
        </div>
      )}
    </motion.div>
  );
}

// Formatting function to parse markdown-like content
function formatMessage(text: string) {
  // Replace URLs with clickable links
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const textWithLinks = text.replace(
    urlRegex,
    (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">${url}</a>`
  );
  
  // Split by paragraphs
  const paragraphs = textWithLinks.split("\n\n");
  
  return (
    <>
      {paragraphs.map((paragraph, i) => {
        // Handle lists
        if (paragraph.includes("- ")) {
          const listItems = paragraph.split("\n- ").map((item, j) => {
            if (j === 0 && !item.startsWith("- ")) return item;
            const cleanItem = j === 0 ? item.replace("- ", "") : item;
            return cleanItem ? <li key={j} dangerouslySetInnerHTML={{ __html: cleanItem }} /> : null;
          });
          
          return (
            <div key={i}>
              {listItems[0] && !listItems[0].props && <p dangerouslySetInnerHTML={{ __html: listItems[0] }} />}
              <ul className="list-disc pl-5 my-2">
                {listItems.slice(listItems[0].props ? 0 : 1)}
              </ul>
            </div>
          );
        }
        
        // Regular paragraphs
        return paragraph.trim() ? (
          <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }} />
        ) : null;
      })}
    </>
  );
}

// Animated dots for typing indicator
function TypewriterDots() {
  return (
    <span className="inline-flex items-center h-4">
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", times: [0, 0.5, 1], repeatDelay: 0 }}
        className="w-1 h-1 mx-0.5 rounded-full bg-current inline-block"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", times: [0, 0.5, 1], delay: 0.2, repeatDelay: 0 }}
        className="w-1 h-1 mx-0.5 rounded-full bg-current inline-block"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", times: [0, 0.5, 1], delay: 0.4, repeatDelay: 0 }}
        className="w-1 h-1 mx-0.5 rounded-full bg-current inline-block"
      />
    </span>
  );
}