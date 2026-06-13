import { useState } from "react";

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
        setTimeout(() => setStatus("idle"), 3000);
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

  const buttonLabel =
    status === "sending"
      ? "Sending…"
      : status === "success"
        ? "Sent — talk soon ✓"
        : status === "error"
          ? "Try again"
          : "Send Message";

  return (
    <section className="contact relative z-[2] py-[56px] md:py-[88px]" id="contact">
      <div className="w-[min(1280px,92vw)] mx-auto">
        <span className="eyebrow center" data-reveal>Let&apos;s Connect</span>
        <p className="intro" data-reveal data-reveal-delay="1">
          Have a project in mind or want to discuss opportunities? I typically respond{" "}
          <b>within 24 hours.</b>
        </p>

        <form className="c-form" onSubmit={handleSubmit} data-reveal data-reveal-delay="2">
          <div className="c-row">
            <div className="field">
              <label>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" /></svg>
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="field">
              <label>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
              />
            </div>
          </div>

          <div className="field" style={{ marginBottom: 38 }}>
            <label>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Project collaboration"
            />
          </div>

          <div className="field area">
            <label>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project..."
              required
            />
          </div>

          <button type="submit" className="send-btn" data-magnetic disabled={status === "sending"}>
            <span>
              {buttonLabel}
              {status === "idle" && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" /></svg>
              )}
            </span>
          </button>

          {status === "error" && (
            <p className="mt-4 text-center" style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, color: "#ff6b6b", letterSpacing: "0.04em" }}>
              Something went wrong. Please email me directly.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
