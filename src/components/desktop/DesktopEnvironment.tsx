import React from "react";
import WindowManager from "@/components/windows/WindowManager";

const DesktopEnvironment: React.FC = () => {
  return (
    <div className="flex-1 relative bg-gradient-to-b from-[#e0e0e0] to-[#b0b0b0] overflow-hidden pb-8">
      <WindowManager />
      <div className="text-3xl font-chicago text-black drop-shadow-sm select-none z-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        Welcome to WebOS MacOS Retro!
      </div>
    </div>
  );
};

export default DesktopEnvironment; 