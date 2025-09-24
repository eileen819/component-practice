import { useEffect, useRef, useState } from "react";

const items = [
  { id: 1, label: "메뉴 1" },
  { id: 2, label: "메뉴 2" },
  { id: 3, label: "메뉴 3" },
  { id: 4, label: "메뉴 4" },
  { id: 5, label: "메뉴 5" },
];

export default function DropDown() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  console.log(isOpen, activeIndex);

  const onBtnClick = () => {
    if (isOpen) {
      setIsOpen(false);
      setActiveIndex(-1);
      btnRef.current?.focus();
    } else {
      setIsOpen(true);
      setActiveIndex(-1);
    }
  };

  const onBtnKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        e.stopPropagation();
        if (!isOpen) setIsOpen(true);
        setActiveIndex(0);
        itemRefs.current[0]?.focus();
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        e.stopPropagation();
        if (!isOpen) {
          setIsOpen(true);
          setActiveIndex(0);
          itemRefs.current[0]?.focus();
        }
        break;
    }
  };

  const move = (dir: 1 | -1) => {
    if (items.length === 0) return;
    const next = (activeIndex + dir + items.length) % items.length;
    setActiveIndex(next);
    itemRefs.current[next]?.focus();
  };

  const onMenuKeyDown: React.KeyboardEventHandler<HTMLUListElement> = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      move(1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      move(-1);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    if (activeIndex >= 0) {
      itemRefs.current[activeIndex]?.focus();
    }
  }, [isOpen, activeIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const onClickClose = (e: PointerEvent) => {
      if (
        btnRef.current &&
        menuRef.current &&
        !btnRef.current.contains(e.target as Node) &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setActiveIndex(-1);
        btnRef.current?.focus();
      }
    };
    const onKeyClose = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setActiveIndex(-1);
        btnRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", onClickClose);
    document.addEventListener("keydown", onKeyClose);

    return () => {
      document.removeEventListener("pointerdown", onClickClose);
      document.removeEventListener("keydown", onKeyClose);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        ref={btnRef}
        type="button"
        onClick={onBtnClick}
        onKeyDown={onBtnKeyDown}
        className="border border-gray-400 focus:border-red-400 rounded-lg w-[200px] py-1 flex justify-center items-center bg-purple-300 cursor-pointer outline-none"
      >
        <span className="flex-1">MENU</span>
        <span className="mr-4">▼</span>
      </button>
      {isOpen && (
        <ul
          ref={menuRef}
          role="menu"
          className="absolute top-full left-0 border border-gray-500 rounded-sm w-[200px]"
          onKeyDown={onMenuKeyDown}
        >
          {items.map((item, i) => (
            <li
              key={item.id}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              tabIndex={i === activeIndex ? 0 : -1}
              role="menuitem"
              className="py-2 px-4 focus:bg-gray-300 hover:bg-gray-300 cursor-pointer outline-none"
              // onMouseEnter={() => setActiveIndex(i)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
