"use client";

import React from "react";

interface AssetHandleProps {
  type: "resize";
  position: "nw" | "ne" | "sw" | "se" | "n" | "s" | "e" | "w";
  onMouseDown: (e: React.MouseEvent) => void;
  isVisible: boolean;
}

export function AssetHandle({ position, onMouseDown, isVisible }: AssetHandleProps) {
  if (!isVisible) return null;

  const getCursor = () => {
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

  const getSize = () => "w-3 h-3";

  const getPosition = () => {
    const offset = -6;

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
        bg-white border-2 border-indigo-500
        absolute rounded-full z-[10001]
        cursor-pointer hover:bg-indigo-50
        transition-all duration-150
        shadow-lg
      `}
      style={{
        ...getPosition(),
        cursor: getCursor()
      }}
      onMouseDown={onMouseDown}
      title={`Resize (${position.toUpperCase()})`}
    />
  );
}

export default AssetHandle;
