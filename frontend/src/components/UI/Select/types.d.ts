export type Option = string | number | Record<string, any>;
export type Value = Option | null;

type OptionsProps<O, V> = O extends string | number
  ? {
      options: O[];
      optionLabel?: never;
      optionValue?: never;
    }
  : V extends string | number
  ? {
      options: O[];
      optionLabel: keyof O;
      optionValue: keyof O;
    }
  : {
      options: O[];
      optionLabel: keyof O;
      optionValue?: never;
    };

type ValueProps<V, O> = V extends string | number | null
  ? {
      value: V;
      onChange: (newVal: any) => void;
      valueLabel?: never;
    }
  : O extends string | number
  ? {
      value: V;
      onChange: (newVal: any) => void;
      valueLabel: keyof V;
    }
  : {
      value: V;
      onChange: (newVal: any) => void;
      valueLabel: keyof V;
    };

export type SelectProps<V, O> = {
  label?: string;
  placeholder?: string;
  clearable?: boolean
} & OptionsProps<O, V> &
  ValueProps<V, O>;