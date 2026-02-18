import { Palette } from "lucide-react";
import { useState, useEffect } from "react";

const THEMES = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
];

function ThemeSelector() {
  const [current, setCurrent] = useState(() => {
    return localStorage.getItem("theme") || "forest";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", current);
    localStorage.setItem("theme", current);
  }, [current]);

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-sm gap-1">
        <Palette size={16} />
        <span className="hidden sm:inline">Theme</span>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-200 rounded-box z-50 w-52 p-2 shadow-lg max-h-80 overflow-y-auto flex-nowrap"
      >
        {THEMES.map((theme) => (
          <li key={theme}>
            <button
              className={`flex justify-between ${current === theme ? "active" : ""}`}
              onClick={() => setCurrent(theme)}
            >
              <span className="capitalize text-xs font-medium">{theme}</span>
              <div
                className="grid grid-cols-2 gap-px p-1 rounded-md bg-base-100 shadow-sm"
                data-theme={theme}
              >
                <div className="size-2 rounded-sm bg-primary" />
                <div className="size-2 rounded-sm bg-secondary" />
                <div className="size-2 rounded-sm bg-accent" />
                <div className="size-2 rounded-sm bg-neutral" />
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ThemeSelector;
