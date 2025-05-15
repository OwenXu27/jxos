import React from "react";

interface DesktopIconProps {
  icon: React.ReactNode;
  title: string;
  onOpen: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, title, onOpen }) => {
  return (
    <div
      className="flex flex-col items-center w-16 select-none cursor-pointer group"
      onDoubleClick={onOpen}
      tabIndex={0}
      role="button"
      aria-label={title}
    >
      <div className="w-12 h-12 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
        {icon}
      </div>
      <span className="text-xs text-black font-chicago text-center whitespace-nowrap px-1 group-hover:bg-black group-hover:text-white rounded">
        {title}
      </span>
    </div>
  );
};

export default DesktopIcon; 