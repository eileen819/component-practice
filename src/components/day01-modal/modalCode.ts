export const modalCode:string = `export default function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDownClose = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const prev = document.activeElement as HTMLElement | null;
    modalRef.current?.focus();
    document.addEventListener("keydown", onKeyDownClose);

    return () => {
      document.removeEventListener("keydown", onKeyDownClose);
      prev?.focus?.();
    };
  }, [isOpen]);

  return (
    <>
      <div className="">
        <button
          className="border rounded-md p-2 bg-gray-200 cursor-pointer"
          onClick={openModal}
        >
          Modal open
        </button>
      </div>
      {isOpen && (
        <div
          className="z-10 fixed inset-0 flex justify-center items-center bg-white/50"
          onClick={closeModal}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            tabIndex={-1}
            className="relative border rounded-lg w-[300px] h-[200px] p-4 bg-pink-100"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h2 id="modal-title" className="font-bold mb-4">
              모달 제목
            </h2>
            <button
              className="absolute top-2 right-3 cursor-pointer"
              onClick={() => setIsOpen(false)}
              aria-label="close"
            >
              ❌
            </button>
            <p>모달 내용입니다.</p>
          </div>
        </div>
      )}
    </>
  );
}`;
