"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function transformTs(data) {
    return data
        .replace(/ng-metadata/g, '@angular')
        .replace(/styles: \[require\((.*)\)\]/g, 'styleUrls: [$1]')
        .replace(/template: require\((.*)\)/g, 'templateUrl: $1');
}
exports.transformTs = transformTs;
