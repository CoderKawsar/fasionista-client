import Select from "react-select";
import { Label } from "@/components/ui/label";

const SelectMulti = ({ className, id, label, options, setItems, value }) => {
  return (
    <div className={`${className}`}>
      <Label htmlFor={`${id}`}>{label}</Label>
      <Select
        id={`${id}`}
        isMulti
        options={options}
        value={options.filter((option) => value.includes(option.value))}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={(value) => setItems(value.map((v) => v.value))}
        styles={{
          control: (base, state) => ({
            ...base,
            borderColor: "black", // Set border color to black
            boxShadow: state.isFocused ? "none" : base.boxShadow, // Remove outline on focus
            "&:hover": {
              borderColor: "black", // Keep border color black on hover
            },
          }),
          placeholder: (base) => ({
            ...base,
            color: "black", // Set placeholder text color to black
            fontSize: "14px",
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
              ? "black" // Custom background color for selected item
              : state.isFocused
              ? "#E0E0E0" // Custom background color on hover
              : "white", // Default background color
            color: state.isSelected
              ? "white" // Custom text color for selected item
              : "black", // Default text color
            "&:hover": {
              backgroundColor: "black", // Custom hover background color
              color: "white", // Custom hover text color
            },
          }),
        }}
      />
    </div>
  );
};

export default SelectMulti;
