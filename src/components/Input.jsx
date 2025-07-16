function Input({ type, name, placeholder, required }) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className="w-full p-2 rounded-lg border border-gray-4 00"
      required
    />
  );
}

export default Input;
