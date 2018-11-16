import commandLineArgs = require('command-line-args');

interface Options {
    paths: string[];
    out: string;
    replace: boolean;
}

export const OPTIONS = commandLineArgs([
    { name: 'paths', multiple: true, defaultOption: true, defaultValue: [] },
    { name: 'out', alias: 'o', type: String, defaultValue: '' },
    { name: 'replace', type: Boolean, defaultValue: false },
]) as Options;
