export function transformTs(data: string): string {
    return data
        .replace(/ng-metadata/g, '@angular')
        .replace(/styles: \[require\((.*)\)\]/g, 'styleUrls: [$1]')
        .replace(/template: require\((.*)\)/g, 'templateUrl: $1');
}
