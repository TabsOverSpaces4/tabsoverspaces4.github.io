import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, Mail, User, MessageSquare } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzVW6_B9KJZntWrDJtBGHmt1jjocq6-xTDdyjZr_kAeCkv1HRpGhcaqRTxnUOqZKzOw/exec";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("subject", formData.subject);
    data.append("message", formData.message);

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-20 max-w-4xl mx-auto">
      <Reveal>
        <div className="mb-12 text-center">
          <SectionHeading>Let's Connect</SectionHeading>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
              Have a project in mind or want to discuss opportunities? I
              typically respond within 24 hours.
            </p>
          </motion.div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="space-y-6 max-w-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              className="space-y-2"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                <User size={10} />
                Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full bg-transparent border-b border-neutral-200 dark:border-neutral-800 focus:border-orange-500 dark:focus:border-orange-500 outline-none py-2.5 text-sm text-neutral-900 dark:text-neutral-100 transition-all placeholder:text-neutral-400"
                  placeholder="John Doe"
                />
                <motion.div
                  className="absolute bottom-0 left-0 h-[1px] bg-orange-500"
                  initial={{ width: 0 }}
                  animate={{ width: focusedField === "name" ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>

            <motion.div
              className="space-y-2"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                <Mail size={10} />
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full bg-transparent border-b border-neutral-200 dark:border-neutral-800 focus:border-orange-500 dark:focus:border-orange-500 outline-none py-2.5 text-sm text-neutral-900 dark:text-neutral-100 transition-all placeholder:text-neutral-400"
                  placeholder="john@example.com"
                />
                <motion.div
                  className="absolute bottom-0 left-0 h-[1px] bg-orange-500"
                  initial={{ width: 0 }}
                  animate={{ width: focusedField === "email" ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          </div>

          <motion.div
            className="space-y-2"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 flex items-center gap-2">
              <MessageSquare size={10} />
              Subject
            </label>
            <div className="relative">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                onFocus={() => setFocusedField("subject")}
                onBlur={() => setFocusedField(null)}
                required
                className="w-full bg-transparent border-b border-neutral-200 dark:border-neutral-800 focus:border-orange-500 dark:focus:border-orange-500 outline-none py-2.5 text-sm text-neutral-900 dark:text-neutral-100 transition-all placeholder:text-neutral-400"
                placeholder="Project collaboration"
              />
              <motion.div
                className="absolute bottom-0 left-0 h-[1px] bg-orange-500"
                initial={{ width: 0 }}
                animate={{ width: focusedField === "subject" ? "100%" : "0%" }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>

          <motion.div
            className="space-y-2"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={() => setFocusedField("message")}
              onBlur={() => setFocusedField(null)}
              required
              rows={5}
              className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:border-orange-500 dark:focus:border-orange-500 outline-none p-3 text-sm text-neutral-900 dark:text-neutral-100 transition-all resize-none placeholder:text-neutral-400 rounded-sm"
              placeholder="Tell me about your project..."
            />
          </motion.div>

          <motion.button
            onClick={handleSubmit}
            disabled={status === "sending"}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full group relative px-6 py-3 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-medium text-xs uppercase tracking-wider hover:bg-orange-500 dark:hover:bg-orange-500 dark:hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/20 to-orange-500/0"
              initial={{ x: "-100%" }}
              animate={{ x: status === "sending" ? "100%" : "-100%" }}
              transition={{
                duration: 1,
                repeat: status === "sending" ? Infinity : 0,
              }}
            />
            {status === "sending" ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Sending...</span>
              </>
            ) : status === "success" ? (
              <span>Message Sent!</span>
            ) : status === "error" ? (
              <span>Try Again</span>
            ) : (
              <>
                <span>Send Message</span>
                <Send
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </>
            )}
          </motion.button>

          {status === "success" && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-center text-orange-500"
            >
              Thanks for reaching out! I'll respond soon.
            </motion.p>
          )}
          {status === "error" && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-center text-red-500"
            >
              Something went wrong. Please email me directly.
            </motion.p>
          )}
        </div>
      </Reveal>
    </section>
  );
};

export default ContactForm;
