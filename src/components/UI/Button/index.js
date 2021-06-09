import React from "react";
import { ButtonComponent } from "./style";

export default function Button({ children, ...props }) {
  return <ButtonComponent {...props}>{children}</ButtonComponent>;
}
