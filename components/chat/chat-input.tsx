"use client";

import React, { FormEvent, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

interface ChatInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (message: string) => void;
  isDisabled?: boolean;
}

export function ChatInput({ value, onChange, onSubmit, isDisabled = false }: ChatInputProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (value.trim() && !isDisabled) {
      onSubmit(value);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !isDisabled) {
        onSubmit(value);
      }
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="relative">
      <Textarea
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder="Ask about digital marketing, web design, or branding..."
        disabled={isDisabled}
        className="min-h-12 resize-none pr-12 py-3 rounded-lg"
        rows={1}
      />
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="absolute right-2 bottom-2"
      >
        <Button
          type="submit"
          size="icon"
          disabled={!value.trim() || isDisabled}
          className="rounded-full h-8 w-8"
        >
          <Send size={16} />
          <span className="sr-only">Send message</span>
        </Button>
      </motion.div>
    </form>
  );
}