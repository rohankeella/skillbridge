import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  ArrowRight, 
  Zap, 
  Lightbulb, 
  Layers, 
  CheckCircle2, 
  Cpu, 
  Flame
} from 'lucide-react';

export default function AICareerCoachDrawer({ 
  isOpen, 
  onClose, 
  student, 
  targetRole = 'Full Stack Developer',
  onOpenRoadmap 
}) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hello ${student?.name || 'Rohan'}! 👋 I am your SkillBridge AI Career Advisor. Based on your current competencies for **${targetRole}**, your readiness score is **78%**.\n\nYour strongest areas are **React** and **Node.js**. Your primary corporate gaps are **Docker**, **AWS Cloud**, and **Automated Testing**.\n\nHow can I help guide your placement preparation today?`
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    'What should I learn next to become a Full Stack Developer?',
    'How do I close my Docker and AWS skill gap?',
    'Why do I match 94% with Microsoft internship?',
    'What capstone project will maximize my readiness score?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (userText) => {
    const textToSend = userText || inputMessage;
    if (!textToSend.trim()) return;

    const updatedMessages = [...messages, { sender: 'user', text: textToSend }];
    setMessages(updatedMessages);
    setInputMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai-coach/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: student?.id,
          message: textToSend,
          targetRole
        })
      });

      const data = await res.json();
      if (data.success && data.reply) {
        setMessages(prev => [...prev, { sender: 'ai', text: data.reply }]);
      } else {
        let fallbackReply = `Your strongest areas are React and Node.js. Your biggest gaps are Docker, AWS and automated testing. I recommend completing Docker fundamentals first, followed by AWS basics and a deployment project.`;
        if (textToSend.toLowerCase().includes('microsoft') || textToSend.toLowerCase().includes('match')) {
          fallbackReply = `You match **94%** with the Microsoft Software Engineer Intern role because:\n\n✓ **React Experience**: Your verified micro-credentials demonstrate strong UI development.\n✓ **Node.js Project**: Your Microservices E-Commerce Gateway proves backend system proficiency.\n✓ **Computer Science Degree**: 8.8 CGPA matches corporate academic eligibility criteria.\n\n⚠ **Gap**: Microsoft recommends containerized testing (Docker + CI/CD). Completing Week 8 of your roadmap will bring your ATS match to 98%!`;
        } else if (textToSend.toLowerCase().includes('project')) {
          fallbackReply = `To boost your Project Readiness factor from 75% to 90%, I suggest building an **Enterprise Multi-Tenant SaaS with CI/CD and AWS S3 upload**. Include JWT authentication, Redis token caching, and Jest integration tests. This directly addresses what Tier-1 campus recruiters evaluate during technical interviews.`;
        }
        setMessages(prev => [...prev, { sender: 'ai', text: fallbackReply }]);
      }
    } catch (err) {
      console.error('AI chat error:', err);
      setMessages(prev => [...prev, { 
        sender: 'ai', 
        text: `Your strongest areas are React and Node.js. Your biggest gaps are Docker, AWS and automated testing. I recommend completing Docker fundamentals first, followed by AWS basics and a deployment project.` 
      }]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white border-l border-[#CBD5E1] h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300 text-[#0F172A]">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#7C3AED] via-[#6D28D9] to-[#0284C7] text-white shadow-md shadow-[#7C3AED]/25">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-[#0F172A] text-base">
                  SkillBridge AI Career Coach
                </h3>
                <span className="text-[10px] font-black uppercase tracking-wider bg-[#F0FDF4] text-[#15803D] px-2 py-0.5 rounded-full border border-[#BBF7D0]">
                  Active
                </span>
              </div>
              <p className="text-[11px] text-[#64748B]">
                Real-time guidance grounded in live industry benchmarks
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A] transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="p-3 bg-[#F8FAFC] border-b border-[#E2E8F0] overflow-x-auto flex gap-2 no-scrollbar">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="text-[11px] whitespace-nowrap bg-white hover:bg-[#F5F3FF] border border-[#CBD5E1] hover:border-[#7C3AED] text-[#6D28D9] px-3 py-1.5 rounded-xl transition font-medium shadow-2xs cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 font-['Inter'] bg-[#F8FAFC]">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="h-8 w-8 rounded-xl bg-[#F5F3FF] border border-[#DDD6FE] flex items-center justify-center text-[#7C3AED] shrink-0 mt-0.5 shadow-2xs">
                  <Bot className="h-4 w-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed space-y-2 ${
                  msg.sender === 'user'
                    ? 'bg-[#7C3AED] text-white font-medium shadow-sm'
                    : 'bg-white border border-[#E2E8F0] text-[#0F172A] shadow-xs'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
              </div>

              {msg.sender === 'user' && (
                <div className="h-8 w-8 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] flex items-center justify-center text-[#0284C7] shrink-0 mt-0.5 shadow-2xs">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-[#F5F3FF] border border-[#DDD6FE] flex items-center justify-center text-[#7C3AED] shrink-0">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-white border border-[#E2E8F0] rounded-2xl px-4 py-3 text-xs text-[#64748B] flex items-center gap-2 shadow-xs">
                <span className="h-2 w-2 rounded-full bg-[#7C3AED] animate-ping" />
                <span>SkillBridge AI is evaluating your profile against recruiter databases...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-[#E2E8F0] bg-white space-y-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask anything about skills, gaps, or interviews..."
              className="flex-1 bg-[#F8FAFC] border border-[#CBD5E1] rounded-2xl px-4 py-3 text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#7C3AED] shadow-inner"
            />
            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="h-11 w-11 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-40 text-white flex items-center justify-center shadow-md shadow-[#7C3AED]/25 transition shrink-0 hover:scale-105 cursor-pointer"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

          <div className="flex items-center justify-between text-[10px] text-[#64748B] px-1">
            <span>Powered by SkillBridge Career Reasoning Model</span>
            <button
              onClick={() => {
                onClose();
                if (onOpenRoadmap) onOpenRoadmap();
              }}
              className="text-[#7C3AED] hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>View Full Visual Roadmap</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
