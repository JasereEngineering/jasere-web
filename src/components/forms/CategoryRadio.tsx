const CategoryRadio = ({
  label,
  id,
  name,
  checked,
  onChange,
  className,
}: {
  label: string;
  id: string;
  name: string;
  className?: string;
  checked?: boolean;
  onChange: (value: any) => void;
}) => {
  return (
    <div className={className || ""}>
      <input
        type="radio"
        id={id}
        name={name}
        value={id}
        checked={checked}
        onChange={() => onChange(id)}
        className="hidden"
      />
      <label htmlFor={id} className="block">
        <div className="border border-violet md:border-[#AFAFAF] md:bg-[#FFFFFF30] rounded-[6px] md:rounded-[25px] px-4 py-[0.875rem] md:px-[1.875rem] md:py-4 flex items-center">
          <div className="border border-violet md:border-none md:bg-[#1E1E1E] rounded-full h-[1rem] w-[1rem] md:h-[1.875rem] md:w-[1.875rem] p-0.5 md:p-1.5 mr-[1.125rem] md:mr-5 flex">
            {checked ? (
              <div className="bg-violet md:bg-[#AFAFAF] rounded-full grow"></div>
            ) : null}
          </div>
          <p className="font-lato font-bold text-[1rem] md:text-[1.875rem] uppercase">
            {label}
          </p>
        </div>
      </label>
    </div>
  );
};

export default CategoryRadio;
