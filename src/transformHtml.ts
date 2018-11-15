import { transformTemplate } from 'create-angular-template';

export function transformHtml(data: string): string {
    return transformTemplate(data)
        .replace(/async\s*:\s*this/g, 'async')
        .replace(/\$ctrl\./g, '')
        .replace(/ng-switch-case/g, '*ngSwitchCase');
}
