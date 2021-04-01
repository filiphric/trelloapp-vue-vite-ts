module.exports = {
  presets: ["@vue/app"],
  plugins: [
    [
      "babel-plugin-istanbul",
      {
        extension: [".ts", ".vue"]
      }
    ]
  ]
};
