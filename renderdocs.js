"use strict";

if (!process.env.FOLDERNAME) {
   if (require("ci-info").isCI) {
      console.error("no folder name provided (and this is CI), aborting");
      process.exit(1);
   }
   process.env.FOLDERNAME = "";
}

const { readFileSync: readfile } = require("fs");
const { resolve: resolvepath } = require("path");
const { parse: json5parse } = require("json5");
const { CliApplication: typedoccliapp } = require("typedoc");
const app = new typedoccliapp();

const input = ["./src/index.ts"];
const out = `docs/${process.env.FOLDERNAME}`;
const tsconfig = json5parse(readfile(resolvepath(__dirname, "tsconfig.json")));

const opts = {
   ...tsconfig.compilerOptions,
   inputFiles: input,
   out: out
};

// shush typedoc lol
delete opts.sourceMap;
delete opts.declaration;

app.bootstrap(opts);
