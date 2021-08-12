import React, { useEffect, useRef, useState } from "react";
import { Block } from "../../blocks";

interface Props {
  block: Block;
  onDelete: () => void;
}

interface DropdownProps {
  active: boolean;
  children: React.ReactNode;
}

const Dropdown = ({ active, children }: DropdownProps) => {
  const className = `absolute lg:-left-36 left-6 ${
    active ? "block" : "hidden"
  }`;
  return (
    <div className={className}>
      <ul className="w-36 divide-y divide-gray-200 bg-white text-black rounded-lg shadow-md cursor-pointer">
        {children}
      </ul>
    </div>
  );
};

const BlockMenu = ({ block, onDelete }: Props) => {
  const ref = useRef<HTMLElement>(null);
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const onBlur = () => {
    setMenuActive(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = (evt: MouseEvent) => {
    if (
      ref.current &&
      evt.target instanceof Node &&
      ref.current.contains(evt.target)
    ) {
      return;
    }
    setMenuActive(false);
  };

  if (block.saveState === "saving") {
    return (
      <span className="ml-2 mr-2 inline-flex items-center">
        <svg
          className="animate-spin h-4 w-4 text-gray-500 inline"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </span>
    );
  } else {
    return (
      <span
        className="ml-1 mr-2 -my-0.5 text-gray-200 inline-flex items-center relative"
        onBlur={onBlur}
        ref={ref}
      >
        <svg
          onClick={toggleMenu}
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 inline cursor-grab hover:text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        <Dropdown active={menuActive}>
          <li className="p-2 hover:bg-gray-100" onMouseDown={onDelete}>
            🗑 Delete
          </li>
        </Dropdown>
      </span>
    );
  }
};

export default BlockMenu;
