import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "rollup-plugin-babel";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";

const env = process.env.NODE_ENV;

export default {
  input: "src/index.js",
  output: {
    format: "umd",
    name: "FrontendCore"
  },
  plugins: [
    nodeResolve(),
    babel({
      exclude: "**/node_modules/**",
      runtimeHelpers: true
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(env)
    }),
    commonjs(),
    env === "production" &&
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false
        }
      })
  ].filter(Boolean)
};
