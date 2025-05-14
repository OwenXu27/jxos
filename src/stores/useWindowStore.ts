import { create } from 'zustand';

export interface WindowData {
  id: string;
  title: string;
  content: React.ReactNode;
  x: number;
  y: number;
  zIndex: number;
  minimized?: boolean;
  collapsed?: boolean;
}

interface WindowStore {
  windows: WindowData[];
  addWindow: (window: Omit<WindowData, 'zIndex' | 'minimized' | 'collapsed'>) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  moveWindow: (id: string, x: number, y: number) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  collapseWindow: (id: string) => void;
  expandWindow: (id: string) => void;
  topZIndex: number;
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],
  topZIndex: 10,
  addWindow: (window) => set((state) => ({
    windows: [
      ...state.windows,
      { ...window, zIndex: state.topZIndex + 1, minimized: false, collapsed: false },
    ],
    topZIndex: state.topZIndex + 1,
  })),
  closeWindow: (id) => set((state) => ({
    windows: state.windows.filter(w => w.id !== id),
  })),
  focusWindow: (id) => set((state) => {
    const win = state.windows.find(w => w.id === id);
    if (!win) return {};
    const newZ = state.topZIndex + 1;
    return {
      windows: state.windows.map(w =>
        w.id === id ? { ...w, zIndex: newZ } : w
      ),
      topZIndex: newZ,
    };
  }),
  moveWindow: (id, x, y) => set((state) => ({
    windows: state.windows.map(w =>
      w.id === id ? { ...w, x, y } : w
    ),
  })),
  minimizeWindow: (id) => set((state) => ({
    windows: state.windows.map(w =>
      w.id === id ? { ...w, minimized: true } : w
    ),
  })),
  restoreWindow: (id) => set((state) => {
    const win = state.windows.find(w => w.id === id);
    if (!win) return {};
    const newZ = state.topZIndex + 1;
    return {
      windows: state.windows.map(w =>
        w.id === id ? { ...w, minimized: false, zIndex: newZ } : w
      ),
      topZIndex: newZ,
    };
  }),
  collapseWindow: (id) => set((state) => ({
    windows: state.windows.map(w =>
      w.id === id ? { ...w, collapsed: true } : w
    ),
  })),
  expandWindow: (id) => set((state) => ({
    windows: state.windows.map(w =>
      w.id === id ? { ...w, collapsed: false } : w
    ),
  })),
})); 