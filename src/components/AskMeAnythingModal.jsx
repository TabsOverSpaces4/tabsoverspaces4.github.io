import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, Bot, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { portfolioContext } from "../data/portfolio";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzVW6_B9KJZntWrDJtBGHmt1jjocq6-xTDdyjZr_kAeCkv1HRpGhcaqRTxnUOqZKzOw/exec";

const AskMeAnythingModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const logToGoogleSheets = async (question, aiResponse) => {
    try {
      const data = new FormData();
      data.append("type", "ai_question");
      data.append("question", question);
      data.append("response", aiResponse || "");

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: data,
      });
    } catch (error) {
      console.error("Failed to log to Google Sheets:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResponse(null);

    const workerUrl = import.meta.env.VITE_WORKER_URL;

    try {
      const res = await fetch(workerUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          systemPrompt: portfolioContext,
        }),
      });

      if (!res.ok) throw new Error("API call failed");

      const data = await res.json();
      const aiText = data?.text;

      const finalResponse =
        aiText || "I couldn't generate a response. Please try again.";
      setResponse(finalResponse);
      setLoading(false);

      logToGoogleSheets(query, finalResponse);
    } catch (error) {
      console.error(error);
      const errorMessage =
        "Sorry, I encountered an error connecting to the AI service. Please check your API key.";
      setResponse(errorMessage);
      setLoading(false);

      logToGoogleSheets(query, errorMessage);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm z-[100]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed left-1/2 top-[20%] -translate-x-1/2 w-[90%] max-w-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl rounded-xl overflow-hidden z-[101]"
          >
            <form
              onSubmit={handleSearch}
              className="relative flex items-center border-b border-neutral-100 dark:border-neutral-800 p-4"
            >
              <Search className="w-5 h-5 text-neutral-400 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask me anything (e.g., 'What makes you a good Product Manager?')"
                className="flex-1 bg-transparent outline-none text-lg text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400"
              />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded text-neutral-400"
                >
                  <span className="text-xs font-mono border border-neutral-200 dark:border-neutral-700 rounded px-1.5 py-0.5">
                    ESC
                  </span>
                </button>
              </div>
            </form>

            <div className="bg-neutral-50 dark:bg-neutral-950/50 min-h-[120px] max-h-[60vh] overflow-y-auto p-6">
              {!response && !loading && (
                <div className="flex flex-col items-center justify-center h-full text-neutral-400 space-y-2 opacity-60 py-8">
                  <Sparkles size={24} />
                  <p className="text-sm">Powered by Claude</p>
                </div>
              )}

              {loading && (
                <div className="flex flex-col items-center justify-center py-8 space-y-3">
                  <Loader2 className="animate-spin text-orange-500" size={24} />
                  <p className="text-xs uppercase tracking-widest text-neutral-500">
                    Let me think...
                  </p>
                </div>
              )}

              {response && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="prose dark:prose-invert prose-sm max-w-none"
                >
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                      <Bot size={16} className="text-orange-500" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          strong: ({ children }) => (
                            <strong className="font-semibold text-neutral-900 dark:text-neutral-100">
                              {children}
                            </strong>
                          ),
                          li: ({ children }) => (
                            <li className="ml-4 list-disc">{children}</li>
                          ),
                        }}
                      >
                        {response}
                      </ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="px-4 py-2 bg-neutral-100 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 flex justify-between items-center text-[10px] text-neutral-500">
              <span>Claude Active</span>
              <span className="font-mono">ENTER to send</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AskMeAnythingModal;
