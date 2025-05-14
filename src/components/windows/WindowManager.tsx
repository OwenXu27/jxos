import React from "react";
import WindowFrame from "@/components/windows/WindowFrame";
import { useWindowStore } from "@/stores/useWindowStore";

const WindowManager: React.FC = () => {
  const { windows, closeWindow, focusWindow, moveWindow, collapseWindow, expandWindow } = useWindowStore();

  return (
    <div className="absolute inset-0">
      {windows.map(win => (
        <WindowFrame
          key={win.id}
          id={win.id}
          title={win.title}
          x={win.x}
          y={win.y}
          zIndex={win.zIndex}
          collapsed={win.collapsed}
          onClose={closeWindow}
          onFocus={focusWindow}
          onMove={moveWindow}
          onCollapse={collapseWindow}
          onExpand={expandWindow}
        >
          {win.content}
        </WindowFrame>
      ))}
    </div>
  );
};

export default WindowManager; 