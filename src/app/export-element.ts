import { drawDOM, exportPDF, DrawOptions, Group } from '@progress/kendo-drawing';
import { saveAs } from '@progress/kendo-file-saver';

export function exportElement(element: HTMLElement, options?: DrawOptions) {
    drawDOM(element, options).then((group: Group) => {
        return exportPDF(group);
    }).then((dataUri) => {
        saveAs(dataUri, 'export.pdf');
    });
}