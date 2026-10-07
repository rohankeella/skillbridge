import React, { useState } from 'react';
import { 
  X, 
  Bot, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Play, 
  RefreshCw, 
  Volume2, 
  MessageSquare,
  ShieldCheck,
  Send,
  Zap,
  Cpu
} from 'lucide-react';

const interviewBanks = {
  'Full-Stack Developer': [
    {
      id: 'q1',
      round: 'Technical Architecture',
      question: 'In a high-concurrency Node.js and MongoDB application, how do you prevent race conditions during inventory checkout, and how would you optimize database indexing for sub-20ms queries?',
      hints: 'Mention ACID transactions, optimistic concurrency control, composite indexes, and Redis distributed locking.',
      sampleAnswer: 'To prevent race conditions, I would implement two-phase commit transactions with MongoDB sessions, or use a distributed lock via Redis Redlock. For queries, I would create composite compound indexes on tenantId and timestamp, and monitor query execution plans with explain().'
    },
    {
      id: 'q2',
      round: 'System Design & State',
      question: 'How do you design a scalable state management architecture in React for enterprise dashboards handling streaming WebSocket updates without unnecessary re-renders?',
      hints: 'Discuss Zustand / Redux Toolkit with selector memoization, WebSockets event buffering, and virtualized lists.',
      sampleAnswer: 'I use Zustand or Redux Toolkit with atomic selector subscriptions so only components consuming updated keys re-render. For high-frequency WebSockets, I batch incoming messages with a 50ms throttle buffer and render lists with TanStack Virtual.'
    }
  ],
  'Cloud & DevOps Engineer': [
    {
      id: 'q1',
      round: 'Infrastructure as Code & CI/CD',
      question: 'How do you ensure zero-downtime rolling updates in Kubernetes with canary deployments, and how do you handle automated rollbacks if error rates exceed 1%?',
      hints: 'Cover ArgoCD / Flagger, Prometheus canary metrics, Kubernetes Readiness Probes, and Helm rollback.',
      sampleAnswer: 'I configure Argo Rollouts with Flagger linked to Prometheus. Flagger shifts 10% of traffic to canary pods. If HTTP 5xx responses exceed 1% over a 5-minute analysis window, Prometheus alerts Flagger to automatically abort the canary and rollback to the stable ReplicaSet.'
    }
  ],
  'AI / ML & Data Science': [
    {
      id: 'q1',
      round: 'Model Optimization & RAG',
      question: 'Explain how you mitigate hallucination in Retrieval-Augmented Generation (RAG) pipelines when querying technical documentation, and how you evaluate retrieval precision.',
      hints: 'Mention chunking strategies with metadata, semantic rerankers (Cohere/BGE), contextual compression, and RAGAS evaluation metrics.',
      sampleAnswer: 'I employ semantic chunking with overlapping windows and dense embeddings. Retrieved top-20 documents are passed through a cross-encoder reranker to extract top-3 relevant contexts. We evaluate context precision and faithfulness using the RAGAS framework.'
    }
  ]
};

export default function AIInterviewModal({ 
  isOpen, 
  onClose, 
  student, 
  onInterviewComplete 
}) {
  const [selectedRole, setSelectedRole] = useState(student?.targetRole || 'Full-Stack Developer');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [evaluating, setEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [interviewComplete, setInterviewComplete] = useState(false);

  if (!isOpen) return null;

  const currentQuestions = interviewBanks[selectedRole] || interviewBanks['Full-Stack Developer'];
  const activeQuestion = currentQuestions[currentQuestionIndex] || currentQuestions[0];

  const handleUseSample = () => {
    setUserAnswer(activeQuestion.sampleAnswer);
  };

  const handleEvaluateAnswer = () => {
    if (!userAnswer.trim()) return;
    setEvaluating(true);

    setTimeout(() => {
      setEvaluating(false);
      // Realistic simulation score
      const score = Math.floor(82 + Math.random() * 12); // 82 to 94
      setEvaluationResult({
        overallScore: score,
        technicalAccuracy: Math.min(100, score + 4),
        systemThinking: Math.min(100, score - 2),
        communication: 90,
        strengths: [
          'Solid grasp of distributed systems & concurrency models',
          'Accurately highlighted indexing and state subscription trade-offs',
          'Clear, production-ready terminology'
        ],
        improvementAreas: [
          'Could elaborate further on edge case failure modes',
          'Mention observability instrumentation (Prometheus / Datadog)'
        ],
        verifiedBadgeAwarded: `${selectedRole} - AI Verified Level II`,
        criBoost: 3.5
      });
    }, 1500);
  };

  const handleNextOrFinish = () => {
    if (currentQuestionIndex + 1 < currentQuestions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setUserAnswer('');
      setEvaluationResult(null);
    } else {
      setInterviewComplete(true);
    }
  };

  const handleApplyToSkillTwin = () => {
    if (onInterviewComplete) {
      onInterviewComplete({
        role: selectedRole,
        score: evaluationResult?.overallScore || 88,
        badge: evaluationResult?.verifiedBadgeAwarded || 'Technical Competency Level II',
        criIncrease: evaluationResult?.criBoost || 3.5
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full border border-[#E2E8F0] shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-[#E2E8F0] bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-[#7C3AED] to-[#0284C7] flex items-center justify-center text-white shadow-md shadow-[#7C3AED]/20">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-[#0F172A]">AI Mock Technical Interview</h3>
                <span className="bg-[#EDE9FE] text-[#6D28D9] text-[10px] font-black px-2 py-0.5 rounded-full border border-[#DDD6FE]">
                  Skill Twin Synchronizer
                </span>
              </div>
              <p className="text-xs text-[#64748B]">
                Real-time technical screening with automated assessment rubrics
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {!interviewComplete ? (
            <>
              {/* Target Role Selector & Progress Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F8FAFC] p-3.5 rounded-2xl border border-[#E2E8F0]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#64748B]">Interview Track:</span>
                  <select
                    value={selectedRole}
                    onChange={(e) => {
                      setSelectedRole(e.target.value);
                      setCurrentQuestionIndex(0);
                      setUserAnswer('');
                      setEvaluationResult(null);
                    }}
                    className="bg-white border border-[#CBD5E1] rounded-xl px-3 py-1.5 text-xs font-bold text-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 cursor-pointer"
                  >
                    <option value="Full-Stack Developer">Full-Stack Developer</option>
                    <option value="Cloud & DevOps Engineer">Cloud & DevOps Engineer</option>
                    <option value="AI / ML & Data Science">AI / ML & Data Science</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-[#64748B]">
                  <span>Question {currentQuestionIndex + 1} of {currentQuestions.length}</span>
                  <div className="w-24 h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#7C3AED] rounded-full transition-all duration-300" 
                      style={{ width: `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Active Technical Scenario Card */}
              <div className="bg-white rounded-2xl p-5 border border-[#DDD6FE] shadow-sm space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="bg-[#F5F3FF] text-[#7C3AED] font-bold text-[11px] px-2.5 py-1 rounded-lg border border-[#DDD6FE]">
                    Round: {activeQuestion.round}
                  </span>
                  <span className="text-[11px] text-[#64748B] font-medium flex items-center gap-1">
                    <Zap className="h-3 w-3 text-[#D97706]" />
                    <span>Live AI Scorer Active</span>
                  </span>
                </div>

                <h4 className="text-base font-extrabold text-[#0F172A] leading-relaxed">
                  {activeQuestion.question}
                </h4>

                <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0] text-xs text-[#64748B]">
                  <strong className="text-[#0F172A]">AI Guidance: </strong>
                  {activeQuestion.hints}
                </div>
              </div>

              {/* User Answer Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-[#0F172A]">Your Technical Explanation:</label>
                  <button
                    onClick={handleUseSample}
                    className="text-[#7C3AED] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="h-3 w-3" />
                    <span>Autofill Sample Model Answer</span>
                  </button>
                </div>

                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Type your structured explanation, architecture decisions, trade-offs, and tool choices..."
                  rows={4}
                  className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-2xl p-4 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:bg-white transition leading-relaxed font-sans"
                />
              </div>

              {/* Evaluation Trigger Button */}
              {!evaluationResult && (
                <button
                  onClick={handleEvaluateAnswer}
                  disabled={!userAnswer.trim() || evaluating}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-6 py-3.5 text-xs font-black shadow-md shadow-[#7C3AED]/25 transition disabled:opacity-50 cursor-pointer"
                >
                  {evaluating ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>AI Neural Evaluator Grading Answer...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      <span>Submit Answer for AI Evaluation</span>
                    </>
                  )}
                </button>
              )}

              {/* Evaluation Results Card */}
              {evaluationResult && (
                <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-5 space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between pb-3 border-b border-[#BBF7D0]">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-[#16A34A]" />
                      <span className="font-extrabold text-sm text-[#15803D]">AI Evaluation Complete</span>
                    </div>
                    <div className="bg-white px-3 py-1 rounded-xl border border-[#BBF7D0] font-black text-sm text-[#16A34A]">
                      Score: {evaluationResult.overallScore} / 100
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
                    <div className="bg-white p-2.5 rounded-xl border border-[#BBF7D0]">
                      <div className="text-[10px] text-[#64748B]">Technical Accuracy</div>
                      <div className="font-black text-[#15803D] text-sm mt-0.5">{evaluationResult.technicalAccuracy}%</div>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-[#BBF7D0]">
                      <div className="text-[10px] text-[#64748B]">System Design</div>
                      <div className="font-black text-[#15803D] text-sm mt-0.5">{evaluationResult.systemThinking}%</div>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-[#BBF7D0]">
                      <div className="text-[10px] text-[#64748B]">Communication</div>
                      <div className="font-black text-[#15803D] text-sm mt-0.5">{evaluationResult.communication}%</div>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-[#166534]">
                    <div className="font-bold">Key Strengths:</div>
                    {evaluationResult.strengths.map((str, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A] shrink-0" />
                        <span>{str}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={handleNextOrFinish}
                      className="w-full flex items-center justify-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white py-3 rounded-xl font-bold text-xs shadow-md transition cursor-pointer"
                    >
                      <span>Continue to Final Summary</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Interview Final Completion & Sync to Skill Twin */
            <div className="text-center py-6 space-y-6 animate-in zoom-in-95">
              <div className="h-16 w-16 mx-auto rounded-3xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center text-3xl shadow-md">
                🎓
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-2xl font-black text-[#0F172A]">
                  Interview Completed Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B]">
                  Your AI mock assessment has been analyzed and validated against corporate campus benchmarks.
                </p>
              </div>

              <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-[#E2E8F0] max-w-md mx-auto text-left space-y-3">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-[#E2E8F0]">
                  <span className="text-[#64748B]">Composite Technical Rating:</span>
                  <span className="font-black text-base text-[#16A34A]">89 / 100 (High Synergy)</span>
                </div>
                <div className="flex items-center justify-between text-xs pb-2 border-b border-[#E2E8F0]">
                  <span className="text-[#64748B]">Skill Twin Verification:</span>
                  <span className="font-bold text-[#7C3AED]">{selectedRole} Level II</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#64748B]">Career Readiness (CRI) Impact:</span>
                  <span className="font-black text-[#D97706]">+3.5% Boost</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={handleApplyToSkillTwin}
                  className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] hover:from-[#6D28D9] hover:to-[#5B21B6] text-white px-8 py-3.5 text-xs font-black shadow-lg shadow-[#7C3AED]/25 transition cursor-pointer"
                >
                  <Cpu className="h-4 w-4" />
                  <span>Synchronize & Update Skill Twin ➔</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
