import React from "react";
import DesktopEnvironment from "@/components/desktop/DesktopEnvironment";
import Taskbar from "@/components/desktop/Taskbar";

const App: React.FC = () => {
  return (
    <div className="w-screen h-screen flex flex-col bg-[--system7-window-bg]">
      <DesktopEnvironment />
      <Taskbar />
    </div>
  );
};

export default App; 