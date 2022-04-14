import React from "react"
import { FoldProvider } from "./src/context/FoldContext"
import {ResponsiveContextProvider} from "./src/context/ResponsiveContext"
import {DarkModeProvider} from "./src/context/DarkModeContext"
export const wrapRootElement = ({ element }) => (
  <DarkModeProvider>
  <ResponsiveContextProvider>
  <FoldProvider>
    {element}
  </FoldProvider>
  </ResponsiveContextProvider>
  </DarkModeProvider>
)