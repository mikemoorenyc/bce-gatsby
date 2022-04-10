import React from "react"
import { FoldProvider } from "./src/context/FoldContext"
import {ResponsiveContextProvider} from "./src/context/ResponsiveContext"
export const wrapRootElement = ({ element }) => (
  <ResponsiveContextProvider>
  <FoldProvider>
    {element}
  </FoldProvider>
  </ResponsiveContextProvider>
)