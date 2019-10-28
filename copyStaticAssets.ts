import * as shell from "shelljs";

shell.cp("-R", "src/static/", "build/src/");
shell.cp("-R", "src/views/", "build/src/");