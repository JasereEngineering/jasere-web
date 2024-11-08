const CorrectGameButton = ({
  text,
  onClick,
  componentIndex,
  renderedIndex,
  hurray,
}: {
  text: string;
  onClick?: (e: any) => void;
  componentIndex: number;
  renderedIndex: number;
  hurray: boolean;
}) => {
  let [bgAddendum, textAddendum] = [`bg-[#E6A101]`, `text-black`];
  if (componentIndex === renderedIndex) {
    bgAddendum = hurray ? (bgAddendum = "bg-[#24B04C]") : "bg-red";
    textAddendum = hurray !== null ? "text-white" : textAddendum;
  }
  const className = `${bgAddendum} p-[0.75rem] h-[6.69rem] text-center ${textAddendum} rounded-[12px] font-lal text-[1.2rem]`;
  return (
    <button className={className} onClick={onClick} type="button">
      {text}
    </button>
  );
};

export default CorrectGameButton;
