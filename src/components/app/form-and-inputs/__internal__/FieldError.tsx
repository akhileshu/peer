type FieldErrorProps = {
  errors?: string[];
};

export const FieldError: React.FC<FieldErrorProps> = ({ errors }) => {
  if (!errors || errors.length === 0) return null;
  return <p className="text-red-500 text-sm">{errors.join(", ")}</p>;
};
