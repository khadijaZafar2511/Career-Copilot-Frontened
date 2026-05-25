import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import { Loader2, Send } from "lucide-react";

import {
  Compass,
  FileText,
  Users,
  Sparkles,
  Briefcase,
  BadgeDollarSign,
  Bot,
} from "lucide-react";
import { Link } from "react-router-dom";
const mentorTopics = [
  {
    icon: Compass,
    title: "Career Guidance",
    description:
      "Get personalized career advice, goal clarity, and actionable next steps.",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: FileText,
    title: "Resume & Profile",
    description:
      "Improve your resume, LinkedIn profile, and personal branding.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Users,
    title: "Interview Preparation",
    description: "Practice interviews, receive feedback, and build confidence.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Sparkles,
    title: "Skill Growth",
    description:
      "Identify in-demand skills and build a focused learning strategy.",
    color: "from-indigo-500 to-violet-500",
  },
  {
    icon: Briefcase,
    title: "Job Search Strategy",
    description:
      "Optimize your job search, applications, and outreach process.",
    color: "from-emerald-500 to-green-500",
  },
  {
    icon: BadgeDollarSign,
    title: "Salary & Negotiation",
    description:
      "Learn salary negotiation techniques and understand your market value.",
    color: "from-orange-500 to-amber-500",
  },
];

export default function AImentorPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const streamResponse = (id, text) => {
    let i = 0;

    const interval = setInterval(() => {
      i += 2;

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === id ? { ...msg, content: text.slice(0, i) } : msg,
        ),
      );

      if (i >= text.length) {
        clearInterval(interval);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === id ? { ...msg, streaming: false } : msg,
          ),
        );
        setLoading(false);
      }
    }, 12);
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = {
      id: Date.now() + "-user",
      role: "user",
      content: input,
    };

    const botId = Date.now() + "-bot";

    const botMsg = {
      id: botId,
      role: "assistant",
      content: "",
      streaming: true,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
    setLoading(true);

    const fakeReply =
      "I am your AI Mentor. I can guide you step-by-step in your learning journey, projects, and career decisions.";

    streamResponse(botId, fakeReply);
  };

  const handleScroll = () => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const username = "Khadija Zafar";

  //   <div className="h-40 w-40 rounded-md bg-blue-100"><Bot/></div>
  return (
    <>
      <div className="lg:max-w-6xl md:max-w-5xl  mx-auto flex items-center justify-center flex-col">
        <div className=" flex md:gap-5 gap-2 md:w-4/5 bg-gray-50 w-full p-4">
          <div className="px-3 md:p-4  h-17   rounded-md bg-blue-100 border border-blue-400 flex items-center justify-center">
            <Bot size={40} />
          </div>
          <div>
            <div className="text-3xl font-semibold text-blue-600 p-2">
              Hi {username} ! 👋
            </div>
            <p className="text-sm">
              Your personal AI Mentor — helping you navigate your career journey
              with clarity, confidence, and personalized guidance.
            </p>
            <Button onClick={handleScroll} className="mt-3 h-13">
              Start Conversation ➔
            </Button>
          </div>
        </div>

        {/* chatbot conversation */}
        <div className="w-full mt-5">
          <div className="h-screen bg-slate-50 flex justify-center p-4">
            {/* Chat Card */}
            <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl flex flex-col overflow-hidden border">
              {/* Header */}
              <div className="px-5 py-4 border-b flex items-center gap-2 bg-white">
                <Sparkles className="w-5 h-5 " />
                <h1 className="font-semibold text-lg">AI Career Mentor</h1>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center text-gray-400 mt-10">
                    Start a conversation with your AI mentor 🚀
                  </div>
                )}

                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-4 py-3 rounded-2xl text-sm max-w-[75%] whitespace-pre-wrap shadow-sm transition-all ${
                        msg.role === "user"
                          ? "bg-foreground text-white rounded-br-sm"
                          : "bg-gray-100 text-gray-900 rounded-bl-sm border"
                      }`}
                    >
                      {msg.content}

                      {msg.streaming && (
                        <span className="ml-1 animate-pulse">▋</span>
                      )}
                    </div>
                  </div>
                ))}

                <div ref={bottomRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t bg-white flex gap-2 items-center">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Ask your AI mentor..."
                  className="flex-1 px-4 py-3 text-sm rounded-xl border bg-slate-50 focus:outline-none focus:ring-1 focus:ring-foreground"
                />

                <button
                  onClick={sendMessage}
                  disabled={loading}
                  className="bg-foreground text-white px-4 py-3 rounded-xl hover:opacity-90 transition flex items-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
