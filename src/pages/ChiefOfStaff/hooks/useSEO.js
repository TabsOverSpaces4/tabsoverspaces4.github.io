import { useEffect } from "react";

const SEO = {
  title: "Chief of Staff · A local-first personal AI",
  description:
    "A self-hosted, local-first AI Chief of Staff. Turns a plain message into real action: calendar events, reminders, email, and web lookups, while running entirely on my own hardware.",
  image: "https://tabsoverspaces4.github.io/chief-of-staff-preview.png",
  url: "https://tabsoverspaces4.github.io/projects/chief-of-staff",
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
      ["og:title", setMeta("og:title", SEO.title)],
      ["og:description", setMeta("og:description", SEO.description)],
      ["og:image", setMeta("og:image", SEO.image)],
      ["og:url", setMeta("og:url", SEO.url)],
      ["og:type", setMeta("og:type", "website")],
      ["twitter:card", setMeta("twitter:card", "summary_large_image")],
      ["twitter:title", setMeta("twitter:title", SEO.title)],
      ["twitter:description", setMeta("twitter:description", SEO.description)],
      ["twitter:image", setMeta("twitter:image", SEO.image)],
      ["description", setMeta("description", SEO.description, "name")],
    ];

    document.title = SEO.title;

    return () => {
      document.title = prevTitle;
      restore.forEach(([prop, prev]) => {
        if (prev !== null) setMeta(prop, prev);
      });
    };
  }, []);
}
