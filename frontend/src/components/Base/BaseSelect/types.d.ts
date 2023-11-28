export type Option = string | number | Record<string, any>;
export type Value = Option;

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

type ValueProps<V, O> = V extends string | number
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

export type BaseSelectProps<O, V> = {
  label?: string;
  placeholder?: string;
} & OptionsProps<O, V> &
  ValueProps<V, O>;