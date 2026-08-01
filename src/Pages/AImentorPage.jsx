import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Send,
  Compass,
  FileText,
  Users,
  Sparkles,
  Briefcase,
  BadgeDollarSign,
  Bot,
} from "lucide-react";

import { useCurrentUser } from "@/Features/Auth/auth.query";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
const mentorTopics = [
  {
    icon: Compass,
    title: "Career Guidance",
    description:
      "Get personalized career advice, goal clarity, and actionable next steps.",
  },
  {
    icon: FileText,
    title: "Resume & Profile",
    description:
      "Improve your resume, LinkedIn profile, and personal branding.",
  },
  {
    icon: Users,
    title: "Interview Preparation",
    description: "Practice interviews, receive feedback, and build confidence.",
  },
  {
    icon: Sparkles,
    title: "Skill Growth",
    description: "Identify skills and build a focused learning strategy.",
  },
  {
    icon: Briefcase,
    title: "Job Search Strategy",
    description: "Optimize applications and job searching process.",
  },
  {
    icon: BadgeDollarSign,
    title: "Salary Negotiation",
    description: "Understand your market value and negotiate better.",
  },
];

export default function AImentorPage() {
  const { data: user } = useCurrentUser();

  const [messages, setMessages] = useState([]);
const [isStreaming, setIsStreaming] = useState(false);
  const [input, setInput] = useState("");



  const bottomRef = useRef(null);

  const username = user?.message || "Guest";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // typing animation
 const streamResponse = (id, text = "") => {
   if (!text) {
     setMessages((prev) =>
       prev.map((msg) =>
         msg.id === id
           ? {
               ...msg,
               content: "No response received.",
               streaming: false,
             }
           : msg,
       ),
     );
     return;
   }

   let index = 0;

   const interval = setInterval(() => {
     index += 50;

     setMessages((prev) =>
       prev.map((msg) =>
         msg.id === id
           ? {
               ...msg,
               content: text.slice(0, index),
             }
           : msg,
       ),
     );

     if (index >= text.length) {
       clearInterval(interval);

       setMessages((prev) =>
         prev.map((msg) =>
           msg.id === id
             ? {
                 ...msg,
                 streaming: false,
               }
             : msg,
         ),
       );
     }
   }, 20);
 };

const sendMessage = async () => {
  if (!input.trim() || isStreaming) return;

  const question = input;

  const userMsg = {
    id: Date.now() + "-user",
    role: "user",
    content: question,
  };

  const botId = Date.now() + "-bot";

  setMessages((prev) => [
    ...prev,
    userMsg,
    {
      id: botId,
      role: "assistant",
      content: "",
      streaming: true,
    },
  ]);

  setInput("");
  setIsStreaming(true);

  try {
    const response = await fetch("http://localhost:3000/ai/chat", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: question,
        userContext: {
          name: user?.name || "Guest",
          careerGoal: user?.goal?.career,
          skillLevel: user?.goal?.skillLevel,
          roadmap: user?.activeRoadmap,
        },
      }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let fullText = "";
    let buffer = "";

    const flush = setInterval(() => {
      if (!buffer) return;

      fullText += buffer;
      buffer = "";

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botId
            ? {
                ...msg,
                content: fullText,
              }
            : msg,
        ),
      );
    }, 10);

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      const chunk = decoder.decode(value);

      const events = chunk.split("\n\n");

      for (const event of events) {
        if (!event.startsWith("data: ")) continue;

        const data = event.replace("data: ", "");

        if (data === "[DONE]") continue;

        buffer += JSON.parse(data);
      }
    }

    clearInterval(flush);

    if (buffer) {
      fullText += buffer;
    }

    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === botId
          ? {
              ...msg,
              content: fullText,
              streaming: false,
            }
          : msg,
      ),
    );
  } catch (err) {
    console.error(err);

    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === botId
          ? {
              ...msg,
              content: "Something went wrong.",
              streaming: false,
            }
          : msg,
      ),
    );
  } finally {
    setIsStreaming(false);
  }
};

  const handleTopicClick = (topic) => {
    setInput(`Help me with ${topic}`);
  };

  return (
    <div className="px-3 md:px-10">
      {/* Header */}

      <div
        className="
md:w-4/5
mx-auto
bg-gray-50
border
rounded-xl
p-5
flex
gap-4
items-center
"
      >
        <div
          className="
bg-blue-100
border
border-blue-400
rounded-xl
p-4
"
        >
          <Bot size={40} />
        </div>

        <div>
          <h1
            className="
text-3xl
font-semibold
text-blue-600
"
          >
            Hi {username}!
          </h1>

          <p className="text-sm mt-2">
            Your personal AI Mentor helping you with career decisions, skills
            and learning roadmap.
          </p>

          <Button
            className="mt-4 px-4 py-5 "
            onClick={() =>
              bottomRef.current?.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            Start Conversation ➜
          </Button>
        </div>
      </div>

      <div
        className="
mt-6
h-screen
bg-slate-50
rounded-2xl
border
shadow-lg
flex
flex-col
overflow-hidden
max-w-4xl
mx-auto
"
      >
        {/* Chat Header */}

        <div
          className="
p-4
border-b
flex
gap-2
items-center
"
        >
          <Sparkles size={20} />

          <h2 className="font-semibold">AI Career Mentor</h2>
        </div>

        {/* Messages */}

        <div
          className="
flex-1
overflow-y-auto
p-5
space-y-4
"
        >
          {messages.length === 0 && (
            <div className="text-center">
              <p
                className="
text-gray-400
mt-5
"
              >
                Start conversation with your AI mentor
              </p>

              <div
                className="
grid
md:grid-cols-2
gap-4
mt-6
"
              >
                {mentorTopics.map((topic) => {
                  const Icon = topic.icon;

                  return (
                    <button
                      key={topic.title}
                      onClick={() => handleTopicClick(topic.title)}
                      className="
border
rounded-xl
p-4
text-left
hover:bg-white
transition
"
                    >
                      <Icon size={22} />

                      <h3 className="font-semibold mt-2">{topic.title}</h3>

                      <p
                        className="
text-sm
text-gray-500
mt-1
"
                      >
                        {topic.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`
flex
${msg.role === "user" ? "justify-end" : "md:justify-start "}
`}
            >
              <div
                className={`

md:max-w-[75%]
max-w-[90%]
px-4
py-3
rounded-2xl
text-sm
shadow

${msg.role === "user" ? "bg-foreground text-white" : "bg-gray-100 border"}

`}
              >
                {msg.role === "assistant" ? (
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.content}
                    </ReactMarkdown>

                    {msg.streaming && (
                      <span className="inline-block w-2 h-2 rounded-full bg-current animate-pulse ml-1 align-middle" />
                    )}
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                )}
              </div>
            </div>
          ))}

          <div ref={bottomRef} />
        </div>

        {/* Input */}

        <div
          className="
p-4
border-t
flex
gap-3
"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="
Ask your AI mentor...
"
            className="
flex-1
rounded-xl
border
px-4
py-3
bg-slate-50
focus:outline-none
"
          />

          <button
            onClick={sendMessage}
            disabled={isStreaming}
            className="
bg-foreground
text-white
rounded-xl
px-5
flex
items-center
"
          >
            {isStreaming ? <Loader2 className="animate-spin" /> : <Send />}
          </button>
        </div>
      </div>
    </div>
  );
}
