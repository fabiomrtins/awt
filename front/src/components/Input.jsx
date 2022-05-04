export default function Input(props) {
  const { type = "text", label, defaultValue = "", handleChange, disabled } = props;

  return (
    <div className="flex gap-2">
      {
        label ? <label htmlFor={defaultValue}>{label}</label> : ""
      }
      <input
        id="name"
        type={type}
        onChange={(e) => handleChange(e.target.value)}
        defaultValue={defaultValue}
        disabled={disabled}
        className="bg-white text-indigo-500 font-semibold"
      />
    </div>
  );
}
