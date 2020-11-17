"use strict";

const { parse: json5parse } = require("json5");
const { readFileSync: readfile } = require("fs");
const { resolve: resolvepath } = require("path");

const { src, dest, task, parallel, series } = require("gulp");
const ts = require("gulp-typescript");
const { init: initsourcemaps, write: writesourcemaps } = require("gulp-sourcemaps");
const del = require("del");

const tsconfig = json5parse(readfile(resolvepath(__dirname, "tsconfig.json")));

task("cleancjs", () => del("cjs"));
task("cleanmjs", () => del("mjs"));

task("buildcjs", () => src("src/**/*.ts").pipe(initsourcemaps()).pipe(ts({
   ...tsconfig.compilerOptions
})).pipe(writesourcemaps()).pipe(dest("cjs")));

task("buildmjs", () => src("src/**/*.ts").pipe(initsourcemaps()).pipe(ts({
   ...tsconfig.compilerOptions,
   module: "ES2020",
   removeComments: false
})).pipe(writesourcemaps()).pipe(dest("mjs")));

exports.build = series(parallel("cleancjs", "cleanmjs"), parallel("buildcjs", "buildmjs"));
exports.default = exports.build;
