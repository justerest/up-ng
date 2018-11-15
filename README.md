# UP-NG

CLI to upgrade ng-metadata + AngularJS (*.html, *.ts)

## Usage

```bash
# Use without installation
npx @justerest/up-ng [--options] <...paths>

# or install globally and use
npm i -g @justerest/up-ng
up-ng [--options] <...paths>
```

By default `up-ng` make backup for current files (`'*.old.*'`) and replace its with transformed data.

To save files to a new directory use `--out` option.

## Options

| Option    | Alias     | Type       | Default | Description                               |
| --------- | --------- | ---------- | ------- | ----------------------------------------- |
| --paths   | `default` | `string[]` |         | Files, component names\*, directories\*\* |
| --out     | -o        | `string`   |         | Output directory                          |
| --replace |           | `boolean`  | `false` | Don't make backup files                   |

\* pattern: `${filePath}.?(ts|html)`  
\** pattern: `${dirPath}/**/*.component.?(ts|html)`