// @jsx jsx
import { jsx } from "theme-ui"
import * as React from "react"
import * as Motion from "framer-motion"
import { S, useStateDesigner } from "@state-designer/react"
import { motion } from "framer-motion"
import * as Utils from "../../../static/scope-utils"
import * as Icons from "react-feather"
import * as ThemeUI from "theme-ui"
import * as Components from "@theme-ui/components"
import { LiveProvider, LiveError, LivePreview } from "react-live"
import { Spinner, useColorMode } from "theme-ui"

// Wrap Theme-UI components in Framer Motion
const WithMotionComponents = Object.fromEntries(
  Object.entries(Components).map(([k, v]) => {
    return [k, motion.custom(v as any)]
  })
)

const Preview: React.FC<{
  code: string
  statics: { [key: string]: any }
  state: S.DesignedState<any, any>
  theme: { [key: string]: any }
}> = ({ code, state, statics, theme }) => {
  const [colorMode] = useColorMode()

  return (
    <LiveProvider
      code={code}
      scope={{
        ...ThemeUI,
        ...Motion,
        ...WithMotionComponents,
        Icons,
        Utils,
        ColorMode: colorMode,
        useStateDesigner,
        Static: statics,
        state,
      }}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          overflow: "scroll",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          sx={{
            p: 2,
            fontSize: 16,
            position: "relative",
            maxHeight: "100%",
            width: "100%",
            maxWidth: "100%",
            overflow: "scroll",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          {!code ? <Spinner /> : <LivePreview />}
        </motion.div>
        <LiveError
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            m: 0,
            padding: 2,
            width: "100%",
            fontSize: 1,
            height: "min-content",
            fontFamily: "monospace",
            bg: "scrim",
            visibility: code ? "visible" : "hidden",
          }}
        />
      </motion.div>
    </LiveProvider>
  )
}

export default React.memo(Preview)
