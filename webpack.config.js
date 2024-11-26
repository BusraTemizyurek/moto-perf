import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import { fileURLToPath } from "url";
import CopyPlugin from "copy-webpack-plugin";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  mode: "development",
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    static: "./public",
    allowedHosts: "all",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(dirname, "dist"),
    clean: true,
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      // include all types of chunks
      chunks: "all",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: dirname + "/templates/index.html",
      filename: "index.html",
      inject: "body",
    }),
    new CopyPlugin({
      patterns: [{ from: "public" }],
    }),
  ],
};
