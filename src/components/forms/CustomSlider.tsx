interface CustomSliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  label: string;
  valueDisplay?: (value: number) => string | number;
  color?: string;
  steps?: number;
  discrete?: boolean;
}

export const CustomSlider = ({
  min,
  max,
  value,
  onChange,
  label,
  valueDisplay = (val) => val.toString(),
  color = "#FF9B9D",
  steps = max - min,
  discrete = false,
}: CustomSliderProps) => {
  const percentage = ((value - min) / (max - min)) * 100;

  const handleValueChange = (newValue: number) => {
    if (discrete && steps > 1) {
      const stepSize = (max - min) / (steps - 1);
      const steppedValue = Math.round(newValue / stepSize) * stepSize;
      onChange(Math.max(min, Math.min(max, steppedValue)));
    } else {
      onChange(Math.max(min, Math.min(max, newValue)));
    }
  };

  const isMin = value === min;
  const isMax = value === max;

  return (
    <div className="mb-6">
      <label className="block text-[11px] font-light font-inter text-white mb-3">
        {label}
      </label>

      <div className="relative w-full h-[5px] mb-4">
        <div className="absolute top-[1.5px] w-full h-[2px] bg-white rounded-full"></div>

        <div
          className="absolute top-0 h-[5px] rounded-full transition-all duration-100"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        ></div>

        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full cursor-pointer shadow-md z-10"
          style={{
            left: `calc(${percentage}% - 8px)`,
          }}
          onMouseDown={(e) => {
            const slider = e.currentTarget.parentElement;
            const startX = e.clientX;
            const startValue = value;

            const handleMouseMove = (moveEvent: MouseEvent) => {
              if (!slider) return;
              const sliderWidth = slider.offsetWidth;
              const deltaX = moveEvent.clientX - startX;
              const valueDelta = (deltaX / sliderWidth) * (max - min);
              let newValue = startValue + valueDelta;

              if (!discrete && steps === max - min) {
                newValue = Math.round(newValue);
              }

              handleValueChange(newValue);
            };

            const handleMouseUp = () => {
              document.removeEventListener("mousemove", handleMouseMove);
              document.removeEventListener("mouseup", handleMouseUp);
            };

            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
          }}
        ></div>

        <input
          type="range"
          min={min}
          max={max}
          step={discrete ? (max - min) / (steps - 1) : 1}
          value={value}
          onChange={(e) => handleValueChange(parseFloat(e.target.value))}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      <div className="relative w-full h-4 font-lex">
        {!isMin && (
          <span className="absolute left-0 text-sm text-white">
            {valueDisplay(min)}
          </span>
        )}

        <span
          className="absolute text-sm px-[5px] py-[2.5px] rounded-full bg-white text-[#FF9B9D] font-medium -translate-x-1/2"
          style={{
            left:
              value === max ? `calc(${percentage}% - 3%)` : `${percentage}%`,
          }}
        >
          {valueDisplay(value)}
        </span>

        {!isMax && (
          <span className="absolute right-0 text-sm text-white">
            {valueDisplay(max)}
          </span>
        )}
      </div>
    </div>
  );
};
