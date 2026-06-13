import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { portfolioContext } from "../data/portfolio";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzVW6_B9KJZntWrDJtBGHmt1jjocq6-xTDdyjZr_kAeCkv1HRpGhcaqRTxnUOqZKzOw/exec";

const SUGGESTIONS = [
  "What makes you a good Product Manager?",
  "Tell me about your latest work",
  "How can I contact you?",
];

const AskMeAnythingModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
      setTimeout(() => inputRef.current?.focus(), 60);
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [isOpen]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages]);

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

  const ask = async (rawQuery) => {
    const question = rawQuery.trim();
    if (!question || loading) return;

    setQuery("");
    setMessages((m) => [...m, { role: "user", text: question }, { role: "bot", loading: true }]);
    setLoading(true);

    const replaceLastBot = (text) =>
      setMessages((m) => m.map((msg, i) => (i === m.length - 1 ? { role: "bot", text } : msg)));

    const workerUrl = import.meta.env.VITE_WORKER_URL;

    try {
      const res = await fetch(workerUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: question,
          systemPrompt: portfolioContext,
        }),
      });

      if (!res.ok) throw new Error("API call failed");

      const data = await res.json();
      const aiText = data?.text || "I couldn't generate a response. Please try again.";
      replaceLastBot(aiText);
      logToGoogleSheets(question, aiText);
    } catch (error) {
      console.error(error);
      const errorMessage =
        "Sorry, I encountered an error connecting to the AI service. Please check your API key.";
      replaceLastBot(errorMessage);
      logToGoogleSheets(question, errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ask(query);
  };

  if (!isOpen) return null;

  return (
    <div className="chat-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="chat-box">
        <form className="chat-input-row" onSubmit={handleSubmit}>
          <svg className="search" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask me anything (e.g., 'What makes you a good Product Manager?')"
            autoComplete="off"
          />
          <button type="button" className="esc" onClick={onClose}>ESC</button>
        </form>

        <div className="chat-body" ref={bodyRef}>
          {messages.length === 0 ? (
            <div className="chat-empty">
              <svg className="spark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.6 5.6l4.2 4.2M14.2 14.2l4.2 4.2M18.4 5.6l-4.2 4.2M9.8 14.2l-4.2 4.2" /></svg>
              <div className="pc">Powered by Claude</div>
              <div className="chat-suggest">
                {SUGGESTIONS.map((s) => (
                  <button key={s} type="button" onClick={() => ask(s)}>{s}</button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, i) =>
              msg.role === "user" ? (
                <div className="msg user" key={i}>
                  <div className="av">HG</div>
                  <div className="bub">{msg.text}</div>
                </div>
              ) : (
                <div className="msg bot" key={i}>
                  <div className="av">✦</div>
                  <div className="bub">
                    {msg.loading ? (
                      <span className="dots"><span /><span /><span /></span>
                    ) : (
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                    )}
                  </div>
                </div>
              )
            )
          )}
        </div>

        <div className="chat-foot">
          <span className="active"><span className="d" />Claude Active</span>
          <span>ENTER to send</span>
        </div>
      </div>
    </div>
  );
};

export default AskMeAnythingModal;
