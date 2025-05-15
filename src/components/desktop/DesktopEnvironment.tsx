import React from "react";
import WindowManager from "@/components/windows/WindowManager";
import DesktopIcon from "@/components/desktop/DesktopIcon";
import { useWindowStore } from "@/stores/useWindowStore";
import NotepadApp from "@/apps/notepad";

const notepadIcon = (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="6" y="4" width="20" height="24" rx="2" fill="#fff" stroke="#222" strokeWidth="2"/>
    <rect x="9" y="8" width="14" height="2" rx="1" fill="#bbb" />
    <rect x="9" y="12" width="14" height="2" rx="1" fill="#bbb" />
    <rect x="9" y="16" width="10" height="2" rx="1" fill="#bbb" />
  </svg>
);

const icons = [
  {
    id: "notepad",
    icon: notepadIcon,
    title: "Notepad",
    onOpen: (addWindow: any) => {
      addWindow({
        id: `notepad-${Date.now()}`,
        title: "Notepad",
        content: <NotepadApp />,
        x: window.innerWidth / 2 - 200,
        y: window.innerHeight / 3,
      });
    },
  },
  // 未来可扩展更多图标
];

const DesktopEnvironment: React.FC = () => {
  const { addWindow } = useWindowStore();

  return (
    <div className="flex-1 relative bg-gradient-to-b from-[#e0e0e0] to-[#b0b0b0] overflow-hidden pb-8">
      {/* 桌面图标区：右上角，竖直优先 grid 排列 */}
      <div className="absolute right-4 top-16 z-20 grid grid-cols-1 gap-y-8 gap-x-8 justify-items-end"
        style={{ gridAutoFlow: 'column', gridTemplateRows: 'repeat(6, minmax(0, 1fr))' }}>
        {icons.map((icon) => (
          <div key={icon.id}>
            <DesktopIcon
              icon={icon.icon}
              title={icon.title}
              onOpen={() => icon.onOpen(addWindow)}
            />
          </div>
        ))}
      </div>
      <WindowManager />
      <div className="text-3xl font-chicago text-black drop-shadow-sm select-none z-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        Welcome to WebOS MacOS Retro!
      </div>
    </div>
  );
};

export default DesktopEnvironment; 