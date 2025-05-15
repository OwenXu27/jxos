import React, { useEffect, useRef, useState } from "react";
import { useWindowStore } from "@/stores/useWindowStore";

const MENU_ITEMS = [
  {
    key: "apple",
    label: <span role="img" aria-label="Apple logo">🍏</span>,
    dropdown: [
      { label: "About This Mac", action: "about" },
      { label: "Shut Down..." },
    ],
  },
  {
    key: "finder",
    label: "Finder",
    dropdown: [
      { label: "About Finder" },
      { label: "Preferences..." },
    ],
  },
  {
    key: "file",
    label: "File",
    dropdown: [
      { label: "New Window" },
      { label: "Close Window" },
    ],
  },
  {
    key: "edit",
    label: "Edit",
    dropdown: [
      { label: "Undo" },
      { label: "Cut" },
      { label: "Copy" },
      { label: "Paste" },
    ],
  },
  {
    key: "view",
    label: "View",
    dropdown: [
      { label: "By Name" },
      { label: "By Date" },
      { label: "By Size" },
    ],
  },
  {
    key: "special",
    label: "Special",
    dropdown: [
      { label: "Empty Trash" },
      { label: "Restart" },
    ],
  },
];

const Taskbar: React.FC = () => {
  const { addWindow, windows } = useWindowStore();
  const barRef = useRef<HTMLDivElement>(null);
  // System 7风格右上角时钟
  const [time, setTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  });
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000 * 30);
    return () => clearInterval(timer);
  }, []);

  // 当前激活的菜单
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // 点击菜单项
  const handleMenuClick = (key: string) => {
    setActiveMenu(activeMenu === key ? null : key);
  };

  // 点击下拉菜单项
  const handleDropdownClick = (item: any) => {
    if (item.action === "about") {
      addWindow({
        id: `about-${Date.now()}`,
        title: "About This Mac",
        content: (
          <div>
            <strong>WebOS MacOS Retro</strong>
            <br />A retro-style web desktop inspired by classic MacOS.<br /><br />Built with React, TailwindCSS, shadcn/ui, Zustand, and Vite.
          </div>
        ),
        x: window.innerWidth / 2 - 200,
        y: window.innerHeight / 3,
      });
    }
    if (item.label === "New Window") {
      addWindow({
        id: `win-${Date.now()}`,
        title: `Window ${windows.length + 1}`,
        content: <div>This is window {windows.length + 1}.</div>,
        x: 100 + Math.random() * 200,
        y: 100 + Math.random() * 200,
      });
    }
    setActiveMenu(null);
  };

  // 点击菜单栏外部关闭菜单
  useEffect(() => {
    const close = (e: PointerEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    if (activeMenu) {
      window.addEventListener("pointerdown", close);
      return () => window.removeEventListener("pointerdown", close);
    }
  }, [activeMenu]);

  return (
    <div ref={barRef} className="fixed top-0 left-0 w-full h-10 bg-[#e0e0e0] border-b-2 border-black flex items-center px-4 z-50 shadow-[0_2px_0_#000] select-none">
      {/* 菜单项 */}
      <div className="flex gap-2 items-center h-full">
        {MENU_ITEMS.map((item) => (
          <div key={item.key} className="relative h-full">
            <button
              className={`h-full px-3 font-chicago text-black text-lg rounded-t border-b-2 border-transparent transition
                ${activeMenu === item.key ? "bg-black text-white border-black" : "hover:bg-[#b0b0b0]"}`}
              onClick={e => { e.stopPropagation(); handleMenuClick(item.key); }}
              style={{ minWidth: item.key === "apple" ? 32 : undefined }}
            >
              {item.label}
            </button>
            {/* 下拉菜单 */}
            {activeMenu === item.key && (
              <div className="absolute left-0 top-full min-w-[140px] bg-white border-2 border-black shadow-lg mt-[-2px] font-chicago text-black text-base">
                {item.dropdown.map((d, i) => (
                  <div
                    key={d.label}
                    className="px-4 py-1 hover:bg-black hover:text-white cursor-pointer whitespace-nowrap"
                    onClick={e => { e.stopPropagation(); handleDropdownClick(d); }}
                  >
                    {d.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex-1" />
      {/* 右侧时钟和托盘预留 */}
      <span className="font-chicago text-black text-base mr-2">
        {time}
      </span>
    </div>
  );
};

export default Taskbar; 