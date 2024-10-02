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
  // const [top, setTop] = useState<number>();
  // const dragbarRef = useRef(null);

  // const handleMouseDown = (event: MouseEvent) => {
  //   event.preventDefault();
  //   document.addEventListener("mousemove", handleMouseMove);
  //   document.addEventListener("mouseup", handleMouseUp);
  // };

  // const handleMouseMove = (event: MouseEvent) => {
  //   const pageStart = document.querySelector(
  //     "div.flex.grow.z-10.h-full.w-full"
  //   )!.clientHeight;
  //   const pageEnd = document.querySelector("#root")!.clientHeight;
  //   let dragPos = event.pageY;

  //   const top =
  //     dragPos <= pageStart
  //       ? 0
  //       : dragPos >= pageEnd
  //       ? pageEnd - pageStart - 16
  //       : dragPos - pageStart;

  //   setTop(top);
  // };

  // const handleMouseUp = () => {
  //   document.removeEventListener("mousemove", handleMouseMove);
  //   document.removeEventListener("mouseup", handleMouseUp);
  // };

  // const handleTouchStart = () => {
  //   document.addEventListener("touchmove", handleTouchMove);
  //   document.addEventListener("touchend", handleTouchEnd);
  // };

  // const handleTouchMove = (event: TouchEvent) => {
  //   const pageStart = document.querySelector(
  //     "div.flex.grow.z-10.h-full.w-full"
  //   )!.clientHeight;
  //   const pageEnd = document.querySelector("#root")!.clientHeight;
  //   let dragPos = event.touches[0].clientY;

  //   const top =
  //     dragPos <= pageStart
  //       ? 0
  //       : dragPos >= pageEnd
  //       ? pageEnd - pageStart - 80
  //       : dragPos - pageStart;

  //   // console.log({ dragPos, pageStart, pageEnd, top });

  //   setTop(top);
  // };

  // const handleTouchEnd = () => {
  //   document.removeEventListener("touchmove", handleTouchMove);
  //   document.removeEventListener("touchend", handleTouchEnd);
  // };

  return (
    <div
      className={`bg-black rounded-tl-[20px] rounded-tr-[20px] z-20 w-full fixed bottom-0 right-0 left-0 flex flex-col overflow-y-auto transition-transform duration-300 ease-in-out ${
        className ? className : ""
      } ${showModal ? "translate-y-0" : "translate-y-full"}`}
      style={{ boxShadow: "0px -10px 20px rgba(255, 255, 255, 0.1)" }}
    >
      <div
        className="pt-[0.875rem] flex justify-center mb-6"
        // ref={dragbarRef}
        //@ts-ignore
        // onMouseDown={handleMouseDown}
        // //@ts-ignore
        // onTouchStart={handleTouchStart}
      >
        <span
          className="rounded-[30px] w-[9.813rem] h-[0.5rem] bg-[#D9D9D924] cursor-row-resize"
          onClick={onClose}
        ></span>
      </div>
      {children}
    </div>
  );
};

export default BottomModal;
