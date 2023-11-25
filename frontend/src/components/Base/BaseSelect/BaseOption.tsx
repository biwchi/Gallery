type BaseOptionProps = {
  label: string;
  value: unknown;
};

export default function BaseOption({ label, value }: BaseOptionProps) {
  return <div>{label}</div>;
}
