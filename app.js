// Live download numbers. Plugins: Obsidian's own stats file. The theme has no
// official counter, so it's how many times its theme.css was downloaded from
// GitHub releases. If either request fails, the numbers baked into the page stay.
(async () => {
  const fmt = (n) => n.toLocaleString("en");
  const note = document.getElementById("stats-note");
  try {
    const r = await fetch("https://raw.githubusercontent.com/obsidianmd/obsidian-releases/master/community-plugin-stats.json");
    const stats = await r.json();
    let total = 0;
    for (const el of document.querySelectorAll("[data-plugin]")) {
      const n = stats[el.dataset.plugin]?.downloads;
      if (n == null) continue;
      total += n;
      el.textContent = `${fmt(n)} downloads`;
    }
    if (total) document.getElementById("plugin-total").textContent = fmt(total);
    if (note) note.textContent = "Live, from Obsidian's download stats and GitHub.";
  } catch {}
  try {
    const r = await fetch("https://api.github.com/repos/krishnanefx/obsidian-tahoe-theme/releases?per_page=100");
    const releases = await r.json();
    let n = 0;
    for (const rel of releases) for (const a of rel.assets) if (a.name === "theme.css") n += a.download_count;
    if (n) {
      const total = document.getElementById("theme-total");
      if (total) total.textContent = fmt(n);
      for (const el of document.querySelectorAll("[data-theme]")) el.textContent = `${fmt(n)} theme downloads`;
    }
  } catch {}
})();
