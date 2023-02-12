import { ReactNode } from "react";
import styled from "styled-components";

export const HeaderText = ({children}: {children?: ReactNode}) => {
  return (
    <div>
      <h2>{children}</h2>
      <hr />
    </div>
  )
}