import { useEffect } from "react";

const ASSISTAI_SEO = {
  title: "AssistAI — Cognitive AI Usage Tracker",
  description:
    "AssistAI is a free, open-source Chrome extension that tracks how you think alongside AI — not what you type. Get scored on Cognitive Engagement, AI Reliance, and Prompt Quality.",
  image: "https://tabsoverspaces4.github.io/assistai-preview.png",
  url: "https://tabsoverspaces4.github.io/projects/assistai",
};

function setMeta(property, content, attr = "property") {
  let el = document.querySelector(`meta[${attr}="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, property);
    document.head.appendChild(el);
  }
  const prev = el.getAttribute("content");
  el.setAttribute("content", content);
  return prev;
}

export function useSEO() {
  useEffect(() => {
    const prevTitle = document.title;
    const restore = [
      ["og:title",          setMeta("og:title",          ASSISTAI_SEO.title)],
      ["og:description",    setMeta("og:description",    ASSISTAI_SEO.description)],
      ["og:image",          setMeta("og:image",          ASSISTAI_SEO.image)],
      ["og:url",            setMeta("og:url",            ASSISTAI_SEO.url)],
      ["og:type",           setMeta("og:type",           "website")],
      ["twitter:card",      setMeta("twitter:card",      "summary_large_image")],
      ["twitter:title",     setMeta("twitter:title",     ASSISTAI_SEO.title)],
      ["twitter:description", setMeta("twitter:description", ASSISTAI_SEO.description)],
      ["twitter:image",     setMeta("twitter:image",     ASSISTAI_SEO.image)],
      ["description",       setMeta("description",       ASSISTAI_SEO.description, "name")],
    ];

    document.title = ASSISTAI_SEO.title;

    return () => {
      document.title = prevTitle;
      restore.forEach(([prop, prev]) => {
        if (prev !== null) setMeta(prop, prev);
      });
    };
  }, []);
}
