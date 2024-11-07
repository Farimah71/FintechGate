export type ButtonPropsType = {
  visible?: boolean;
  title: string;
  clickHandler?: () => void;
};

export interface ButtonContext {
  buttonProps: ButtonPropsType;
  setButtonProps: React.Dispatch<React.SetStateAction<ButtonPropsType>>;
}
