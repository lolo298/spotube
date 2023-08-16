import type Button from "./button/Button.svelte";
import type Input from "./input/Input.svelte";
import type Label from "./label/Label.svelte";



declare module '$components/ui' {
  export const Button: Button;
  export const Input: Input;
  export const Label: Label;
}