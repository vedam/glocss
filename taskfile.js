const dist = "dist";

const postcss = {
  // map: { inline: true },
  from: "undefined",
  plugins: [
    require("cssnano")({
      calc: false,
      discardComments: false,
      zindex: false,
      autoprefixer: {
        remove: true,
        add: true
      }
    })
  ]
};

const concat = {
  output: "global.css"
  // map: true,
};

export async function cleanup(task) {
  await task.clear(dist);
}

export async function helpers(task) {
  await task
    .source("src/helpers/*.css")
    .postcss(postcss)
    .concat(concat)
    .target(dist);
}

export async function standalone(task) {
  await task
    .source("src/*.css")
    .postcss(postcss)
    .target(dist);
}

export default async function(task) {
  await task.watch("src/**/*.css", ["standalone", "helpers"]);
}

export async function build(task) {
  await task.serial(["cleanup", "standalone", "helpers"]);
}
