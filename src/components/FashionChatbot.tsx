import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { MessageCircle, Send, X } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const FashionChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your AI fashion consultant. Ask me anything about style, trends, or outfit recommendations! 👗✨"
    }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const responses = [
        "That's a great choice! I recommend pairing it with neutral tones for a balanced look.",
        "Based on your skin analysis, I suggest trying warmer colors like burgundy or emerald green.",
        "For your body shape, fitted styles would look amazing! Have you checked our A-line collection?",
        "That color would be perfect for the upcoming season! Would you like to see similar items?",
        "I love your style! Consider adding some statement accessories to complete the look."
      ];
      
      const assistantMessage: Message = {
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)]
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  return (
    <>
      {!isOpen && (
        <Button
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-glow bg-gradient-primary text-primary-foreground border-0 z-50"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="h-7 w-7" />
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-glow z-50 flex flex-col">
          <div className="p-4 border-b border-border bg-gradient-primary text-primary-foreground rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold">Fashion Assistant</h3>
                <p className="text-xs opacity-90">Online now</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-white/10"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.role === "user"
                        ? "bg-gradient-primary text-primary-foreground"
                        : "bg-muted text-card-foreground"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                placeholder="Ask about fashion, style, trends..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="flex-1"
              />
              <Button
                className="bg-gradient-primary text-primary-foreground border-0"
                size="icon"
                onClick={handleSend}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default FashionChatbot;
