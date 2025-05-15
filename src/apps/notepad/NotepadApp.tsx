import React, { useRef } from "react";

const system7Btn =
  "px-3 py-1 border border-t border-l border-b-2 border-r-2 rounded bg-[#e0e0e0] font-chicago text-base font-bold shadow-[inset_1px_1px_0_#fff] active:shadow-none active:bg-[#b0b0b0] hover:bg-[#d0d0d0] select-none mx-[2px] min-w-[32px] min-h-[32px] flex items-center justify-center";
const system7Divider = "mx-2 w-px h-7 bg-gray-500";
const system7Toolbar = "flex items-center p-2 bg-[#d4d4d4] border-b-2 border-[#b0b0b0]";

const NotepadApp: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  const handleCommand = (cmd: string) => {
    document.execCommand(cmd, false);
  };

  return (
    <div className="flex flex-col h-full w-full font-chicago">
      {/* 工具栏 */}
      <div className={system7Toolbar}>
        {/* B I U */}
        <button className={system7Btn} title="Bold" onMouseDown={e => { e.preventDefault(); handleCommand("bold"); }}>B</button>
        <button className={system7Btn} title="Italic" onMouseDown={e => { e.preventDefault(); handleCommand("italic"); }}><span style={{fontStyle:'italic'}}>I</span></button>
        <button className={system7Btn} title="Underline" onMouseDown={e => { e.preventDefault(); handleCommand("underline"); }}><span style={{textDecoration:'underline'}}>U</span></button>
        <div className={system7Divider} />
        {/* 对齐按钮 */}
        <button className={system7Btn} title="Align Left" onMouseDown={e => { e.preventDefault(); handleCommand("justifyLeft"); }}>
          <svg width="18" height="12"><rect x="2" y="2" width="14" height="2" fill="#222"/><rect x="2" y="6" width="10" height="2" fill="#222"/></svg>
        </button>
        <button className={system7Btn} title="Align Center" onMouseDown={e => { e.preventDefault(); handleCommand("justifyCenter"); }}>
          <svg width="18" height="12"><rect x="4" y="2" width="10" height="2" fill="#222"/><rect x="2" y="6" width="14" height="2" fill="#222"/></svg>
        </button>
        <button className={system7Btn} title="Align Right" onMouseDown={e => { e.preventDefault(); handleCommand("justifyRight"); }}>
          <svg width="18" height="12"><rect x="2" y="2" width="14" height="2" fill="#222"/><rect x="6" y="6" width="10" height="2" fill="#222"/></svg>
        </button>
      </div>
      {/* 编辑区 */}
      <div
        ref={editorRef}
        className="flex-1 p-4 text-base outline-none bg-white overflow-auto border border-[#b0b0b0] rounded-lg shadow-inner mt-2"
        contentEditable
        suppressContentEditableWarning
        spellCheck={true}
        style={{ minHeight: 200 }}
      />
    </div>
  );
};

export default NotepadApp; 