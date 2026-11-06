// Turns ```mermaid code blocks (rendered by kramdown as code.language-mermaid, sometimes
// wrapped in div.highlighter-rouge) into Mermaid diagrams. Opt in per post with:
//   ext-js: [{href: <mermaid CDN url>, sri: <hash>}]
//   js: [/assets/js/mermaid-init.js]
(function () {
  if (typeof mermaid === "undefined") {
    throw new Error("mermaid-init.js loaded but the Mermaid library is missing; add it via ext-js in the post front matter");
  }
  document.querySelectorAll("code.language-mermaid").forEach(function (code) {
    var container = code.closest("div.highlighter-rouge") || code.closest("pre");
    var diagram = document.createElement("pre");
    diagram.className = "mermaid";
    diagram.textContent = code.textContent;
    container.replaceWith(diagram);
  });
  mermaid.initialize({ startOnLoad: false, theme: "neutral" });
  mermaid.run({ nodes: document.querySelectorAll("pre.mermaid") });
})();
