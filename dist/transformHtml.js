"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var create_angular_template_1 = require("create-angular-template");
function transformHtml(data) {
    return create_angular_template_1.transformTemplate(data)
        .replace(/async\s*:\s*this/g, 'async')
        .replace(/\$ctrl\./g, '')
        .replace(/ng-switch-case/g, '*ngSwitchCase');
}
exports.transformHtml = transformHtml;
