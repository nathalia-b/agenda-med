"use client";

type Option = {
  id: number;
  nome: string;
};

type SelectProps = {
  id: string;
  value: number | "";
  onChange: (value: number | "") => void;
  options: Option[];
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
};

export function SelectComponent({
  id,
  value,
  onChange,
  options,
  placeholder,
  required = true,
  disabled = false,
}: SelectProps) {
  return (
    <div>
      <select
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        required={required}
        disabled={disabled}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nome}
          </option>
        ))}
      </select>
    </div>
  );
}
