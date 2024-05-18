const AppLayout = ({
  children,
  className,
}: {
  children: any;
  className?: string;
}) => {
  return (
    <div
      className={`grow bg-gradient-to-r from-[#1E1E1E] to-[#18365E] text-white ${
        className ? className : ""
      }`}
    >
      {children}
    </div>
  );
};

export default AppLayout;
