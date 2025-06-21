import { useEffect, useRef } from "react";

const BottomModal = ({
  children,
  onClose,
  className,
  showModal,
}: {
  children: any;
  onClose: () => void;
  className?: string;
  showModal?: boolean;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        showModal
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, showModal]);

  return (
    <div
      className={`fixed inset-0 z-10 flex justify-end items-end transition-opacity duration-300 ease-in-out ${
        showModal ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-black rounded-tl-[20px] rounded-tr-[20px] z-20 w-full flex flex-col overflow-y-auto transition-transform duration-300 ease-in-out ${
          className ? className : ""
        } ${showModal ? "translate-y-0" : "translate-y-full"}`}
        style={{ boxShadow: "0px -10px 20px rgba(255, 255, 255, 0.1)" }}
        ref={modalRef}
      >
        <div className="pt-[0.875rem] flex justify-center mb-6">
          <span
            className="rounded-[30px] w-[9.813rem] h-[0.5rem] bg-[#D9D9D924] cursor-row-resize"
            onClick={onClose}
          ></span>
        </div>
        {children}
      </div>
    </div>
  );
};

export default BottomModal;
