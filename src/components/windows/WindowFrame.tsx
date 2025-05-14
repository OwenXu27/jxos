import React, { useRef, useState } from "react";

interface WindowFrameProps {
  id: string;
  title: string;
  x: number;
  y: number;
  zIndex: number;
  collapsed?: boolean;
  onClose: (id: string) => void;
  onFocus: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
  onCollapse: (id: string) => void;
  onExpand: (id: string) => void;
  children?: React.ReactNode;
}

const WindowFrame: React.FC<WindowFrameProps> = ({ id, title, x, y, zIndex, collapsed, onClose, onFocus, onMove, onCollapse, onExpand, children }) => {
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  // 新增：窗口宽高状态
  const [size, setSize] = useState({ width: 400, height: 300 });
  const resizing = useRef<null | {
    dir: string;
    startX: number;
    startY: number;
    startW: number;
    startH: number;
    startXPos: number;
    startYPos: number;
  }>(null);
  const minWidth = 200;
  const minHeight = 100;

  const buttonBase =
    "w-4 h-4 flex items-center justify-center border border-black rounded-sm text-xs leading-none transition-colors duration-100 select-none";
  const buttonDefault = "bg-white text-black";
  const buttonHover = "hover:bg-black hover:text-white";

  // 鼠标按下标题栏
  const onMouseDown = (e: React.MouseEvent) => {
    if (collapsed) return;
    dragging.current = true;
    offset.current = {
      x: e.clientX - x,
      y: e.clientY - y,
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    onFocus(id);
  };

  // 鼠标移动
  const onMouseMove = (e: MouseEvent) => {
    if (dragging.current) {
      onMove(id, e.clientX - offset.current.x, e.clientY - offset.current.y);
    } else if (resizing.current) {
      const { dir, startX, startY, startW, startH, startXPos, startYPos } = resizing.current;
      let newW = startW;
      let newH = startH;
      let newX = x;
      let newY = y;
      if (dir.includes("e")) newW = Math.max(minWidth, startW + (e.clientX - startX));
      if (dir.includes("s")) newH = Math.max(minHeight, startH + (e.clientY - startY));
      if (dir.includes("w")) {
        const delta = e.clientX - startX;
        newW = Math.max(minWidth, startW - delta);
        if (newW > minWidth) newX = startXPos + delta;
      }
      if (dir.includes("n")) {
        const delta = e.clientY - startY;
        newH = Math.max(minHeight, startH - delta);
        if (newH > minHeight) newY = startYPos + delta;
      }
      setSize({
        width: newW,
        height: newH,
      });
      if (newX !== x || newY !== y) {
        onMove(id, newX, newY);
      }
    }
  };

  // 鼠标松开
  const onMouseUp = () => {
    dragging.current = false;
    resizing.current = null;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  // 新增：按下热区开始resize
  const onResizeMouseDown = (dir: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    resizing.current = {
      dir,
      startX: e.clientX,
      startY: e.clientY,
      startW: size.width,
      startH: size.height,
      startXPos: x,
      startYPos: y,
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    onFocus(id);
  };

  // 点击标题栏收起/还原
  const handleTitleBarClick = () => {
    if (collapsed) {
      onExpand(id);
    } else {
      onFocus(id);
    }
  };

  return (
    <div
      className="absolute min-h-[32px] bg-white border-2 border-black shadow-lg rounded-sm select-none"
      style={{
        left: x,
        top: y,
        zIndex,
        width: size.width,
        height: collapsed ? undefined : size.height,
        boxShadow: "4px 4px 0 #000",
      }}
      onMouseDown={() => onFocus(id)}
    >
      {/* resize 热区：四边和四角 */}
      {/* 边 */}
      <div onMouseDown={onResizeMouseDown('n')} className="absolute top-0 left-0 right-0 h-2 cursor-ns-resize z-20" />
      <div onMouseDown={onResizeMouseDown('s')} className="absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize z-20" />
      <div onMouseDown={onResizeMouseDown('e')} className="absolute top-0 bottom-0 right-0 w-2 cursor-ew-resize z-20" />
      <div onMouseDown={onResizeMouseDown('w')} className="absolute top-0 bottom-0 left-0 w-2 cursor-ew-resize z-20" />
      {/* 角 */}
      <div onMouseDown={onResizeMouseDown('ne')} className="absolute top-0 right-0 w-4 h-4 cursor-nesw-resize z-20" />
      <div onMouseDown={onResizeMouseDown('nw')} className="absolute top-0 left-0 w-4 h-4 cursor-nwse-resize z-20" />
      <div onMouseDown={onResizeMouseDown('se')} className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-20" />
      <div onMouseDown={onResizeMouseDown('sw')} className="absolute bottom-0 left-0 w-4 h-4 cursor-nesw-resize z-20" />
      <div
        className="flex items-center h-8 px-2 bg-[#e0e0e0] border-b-2 border-black cursor-pointer"
        onMouseDown={onMouseDown}
        onClick={handleTitleBarClick}
        style={{ userSelect: "none" }}
      >
        {/* 收起/还原按钮 */}
        <button
          className={`${buttonBase} ${buttonDefault} ${buttonHover} mr-2`}
          onClick={e => { e.stopPropagation(); collapsed ? onExpand(id) : onCollapse(id); }}
          tabIndex={-1}
          aria-label={collapsed ? "Expand window" : "Collapse window"}
        >
          &#9632;
        </button>
        <span className="text-black font-chicago text-base tracking-wide flex-1">
          {title}
        </span>
        <button
          className={`${buttonBase} ${buttonDefault} ${buttonHover} ml-2`}
          onClick={(e) => { e.stopPropagation(); onClose(id); }}
          tabIndex={-1}
          aria-label="Close window"
        >
          ×
        </button>
      </div>
      {!collapsed && (
        <div
          className="p-4 text-black font-chicago text-sm bg-white box-border overflow-auto"
          style={{ height: `calc(100% - 32px)` }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default WindowFrame; 