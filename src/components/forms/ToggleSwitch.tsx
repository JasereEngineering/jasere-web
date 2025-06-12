interface ToggleSwitchProps {
  isOn: boolean;
  handleToggle: () => void;
  onColor?: string;
  offColor?: string;
}

function ToggleSwitch({
  isOn,
  handleToggle,
  onColor = "bg-white",
  offColor = "bg-white",
}: ToggleSwitchProps) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={isOn}
        onChange={handleToggle}
      />
      <div
        className={`w-[31px] h-[19px] ${offColor} peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[12px] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#1E1E1E] after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:${onColor}`}
      ></div>
    </label>
  );
}

export default ToggleSwitch;
