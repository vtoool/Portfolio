"use client";

import React from "react";

interface AssetHandleProps {
  type: "move" | "resize";
  position: "nw" | "ne" | "sw" | "se" | "n" | "s" | "e" | "w";
  onMouseDown: (e: React.MouseEvent) => void;
  isVisible: boolean;
}

export function AssetHandle({ type, position, onMouseDown, isVisible }: AssetHandleProps) {
  if (!isVisible) return null;

  const getCursor = () => {
    if (type === "move") return "move";

    const cursors = {
      nw: "nw-resize",
      ne: "ne-resize",
      sw: "sw-resize",
      se: "se-resize",
      n: "n-resize",
      s: "s-resize",
      e: "e-resize",
      w: "w-resize",
    };
    return cursors[position];
  };

  const getSize = () => {
    if (type === "move") return "w-5 h-5";
    return "w-3 h-3";
  };

  const getPosition = () => {
    const size = type === "move" ? 10 : 6;
    const offset = type === "move" ? -10 : -6;

    const positions = {
      nw: { top: offset, left: offset },
      ne: { top: offset, right: offset },
      sw: { bottom: offset, left: offset },
      se: { bottom: offset, right: offset },
      n: { top: offset, left: "50%", transform: "translateX(-50%)" },
      s: { bottom: offset, left: "50%", transform: "translateX(-50%)" },
      e: { top: "50%", right: offset, transform: "translateY(-50%)" },
      w: { top: "50%", left: offset, transform: "translateY(-50%)" },
    };

    return positions[position];
  };

  return (
    <div
      className={`
        ${getSize()}
        ${type === "move"
          ? "bg-indigo-500/80 hover:bg-indigo-400 cursor-move"
          : "bg-white border-2 border-indigo-500 cursor-pointer hover:bg-indigo-50"
        }
        absolute rounded-full z-[10000]
        transition-all duration-150
        ${type === "move" ? "shadow-lg shadow-indigo-500/50" : ""}
      `}
      style={getPosition()}
      onMouseDown={onMouseDown}
      title={type === "move" ? "Drag to move" : `Resize (${position.toUpperCase()})`}
    />
  );
}

export default AssetHandle;
