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
        <div className="border border-violet rounded-[6px] px-4 py-[0.875rem] flex items-center">
          <div className="border border-violet rounded-full h-[1rem] w-[1rem] p-0.5 mr-[1.125rem] flex">
            {checked ? <div className="bg-violet rounded-full grow"></div>: null}
          </div>
          <p className="font-lato font-bold text-[1rem] uppercase">{label}</p>
        </div>
      </label>
    </div>
  );
};

export default CategoryRadio;
