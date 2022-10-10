import { Component,ViewChild,ElementRef, OnInit} from '@angular/core';
import jspdf, { jsPDF }from "jspdf";
import html2canvas from 'html2canvas';
import { textAlign } from 'html2canvas/dist/types/css/property-descriptors/text-align';
 import { exportElement } from "./export-element";
import { PdfMargins, PdfPageOrientation, PdfPageSettings } from '@syncfusion/ej2-pdf-export';
import { X_OK } from 'constants';
import { image } from 'html2canvas/dist/types/css/types/image';
import { saveAs } from 'file-saver';

// import JSZip from "jszip";

import * as JSZip from 'jszip';
import * as JSZipUtils from 'jszip-utils';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

 
  constructor(private httpClient: HttpClient) {}
download = async () => {
    const files = [
      'file:///C:/Users/Calibrage20/Downloads/HTML-Document%20-%202022-10-07T140948.303.pdf',
      'file:///C:/Users/Calibrage20/Downloads/HTML-Document%20-%202022-10-07T140948.303.pdf'
    ];
    this.createZip(files, 'sample');
    // this.newDownload(files);
  };

  async getFile(url: string) {
    const httpOptions = {
      responseType: 'blob' as 'json',
    };
    const res = await this.httpClient
      .get(url, httpOptions)
      .toPromise()
      .catch((err: HttpErrorResponse) => {
        const error = err.error;
        return error;
      });
    return res;
  }

  async createZip(files: any[], zipName: string) {
    const zip = new JSZip();
    const name = zipName + '.zip';
    // tslint:disable-next-line:prefer-for-of
    for (let counter = 0; counter < files.length; counter++) {
      const element = files[counter];
      const fileData: any = await this.getFile(element);
      const b: any = new Blob([fileData], { type: '' + fileData.type + '' });
      zip.file(element.substring(element.lastIndexOf('/') + 1), b);
    }
    zip.generateAsync({ type: 'blob' }).then(function (content) {
      // see FileSaver.js
      saveAs(content, 'sample.zip');
    });
  }

  newDownload(fileUrl) {
    const zip = new JSZip();
    var count = 0;
    var zipFilename = 'zipFilename.zip';

    fileUrl.forEach(function (url, index) {
      var filename = 'file-' + index;
      // loading a file and add it in a zip file
      JSZipUtils.getBinaryContent(url, async function (err, data) {
        if (err) {
          throw err; // or handle the error
        }
        zip.file(url, data, { binary: true });
        count++;
        if (count == fileUrl.length) {
          var zipFile = await zip.generateAsync({ type: 'blob' });
          saveAs(zipFile, zipFilename);
        }
      });
    });
  }

 
//  @ViewChild('content')el!: ElementRef<HTMLImageElement>;
  title = 'mypdf';
  ///by using kendo
  public onClick(element) {
    exportElement(element, {
      
      paperSize: "A4",
  
    });

  }
///////
  ngOnInit() {

  }

// makePDF(){
//       let pdf = new jsPDF('p','pt','a4');
    
// pdf.html(this.el.nativeElement,{
//       callback:(pdf)=>{
//         pdf.save("demo.pdf");
//       }
//     })
// html2canvas(this.el.nativeElement).then((canvas)=>{
//   const imgData = canvas.toDataURL('image/jpeg');
//   const pdf = new jsPDF({
//     orientation:'portrait'
//   });

//   const imageProps =pdf.getImageProperties(imgData);
// const pdfw =pdf.internal.pageSize.getWidth();
// const pdfh =(imageProps.height* pdfw)/imageProps.width;
// pdf.addImage(imgData,'PNG',0,0,pdfw,pdfh);
// // Save the doc
// pdf.save('demo.pdf');

    
// })
   
//   }




// name = 'Angular';
convertToPdf() {
  //WORKING EXAMPLE IS HERE
  let html1 = document.querySelector('.printformClass');
  html2canvas(document.querySelector('.printformClass')).then((canvas) => {
    var pdf = new jsPDF('p', 'pt', [canvas.width, canvas.height]);

    var imgData = canvas.toDataURL('image/jpeg', 1.0);
    pdf.addImage(imgData, 0, 0, canvas.width, canvas.height);
    pdf.save('converteddoc.pdf');
  });
}







getPDF() {
html2canvas(document.querySelector('.printformClass')).then(function (
 canvas
  ) {
    
    canvas.getContext('2d');

    var HTML_Width = canvas.width;
    var HTML_Height = canvas.height;
 
    var top_left_margin = 15;

    var PDF_Width = HTML_Width + (top_left_margin*2);
    var PDF_Height = (PDF_Width * 1.5 )+ (top_left_margin*2);
 
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;

  var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
    console.log(canvas.height + '  ' + canvas.width);
    
var imgData = canvas.toDataURL('image/jpeg', 1.0);

var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);


pdf.addImage(
  imgData,
      'JPG',
      top_left_margin,
      top_left_margin,
      canvas_image_width,
      canvas_image_height
      
 
    );
    for (var i = 1; i <= totalPDFPages; i++) {
      pdf.addPage([PDF_Width, PDF_Height]);
      
      let margin = -(PDF_Height * i) + top_left_margin *4;
      if (i > 1) {
        margin = margin + i * 8;
      }
      
       console.log(top_left_margin);
      console.log(top_left_margin);
      console.log(-(PDF_Height * i) + top_left_margin * 4);
       pdf.addImage(
        imgData,
        'JPG',
        top_left_margin,
        margin,
        canvas_image_width,
        canvas_image_height
       );
 }
 
 //border
    for (let i = 0; i < pdf.getNumberOfPages(); i++) {
      pdf.setPage(i + 1)
      pdf.setDrawColor("#000000");
      //  pdf.setDrawColor("red");
      pdf.rect(6, 6, pdf.internal.pageSize.width -10, pdf.internal.pageSize.height - 10, 'S');
    }
 // page Numbers
        const addFooters = pdf => {
          //get the number of pages
      const pageCount = pdf.internal.getNumberOfPages()
      pdf.setFont('helvetica', 'italic')
      pdf.setFontSize(18)
      //for each page,print the page number and the total pages
      for (var i = 1; i <= pageCount; i++) {
        //Go to page i
        pdf.setPage(i)
        //header
        // const header = 'Resume';
        
        // pdf.text(header, 40, 15, { baseline: 'top' });

        // print page 1 of 4 for example
        pdf.text('Page ' + String(i) + ' of ' + String(pageCount), pdf.internal.pageSize.width / 1.1, 900,{
          
           align: 'right'
           })
          }
           } 
addFooters(pdf)
//  pdf.save('fhg')
 
pdf.save('HTML-Document.pdf');
  });
  // this.get2pdfs();
}
//photos
public urls = [
  'https://i.imgur.com/R4gpt2H_d.webp',
  'https://i.imgur.com/BevyDwM_d.webp',
  'https://i.imgur.com/pHMY26k_d.webp'
];

downloadAsZip(): void {
  let count = 0;
  const zip = new JSZip();

  this.urls.forEach((url) => {
const filename = url.split('/')[url.split('/').length - 1];
 
JSZipUtils.getBinaryContent(url, (err, data) => {
  if (err) {
    throw err;
  }

  zip.file(filename, data, {binary: true});
  count++;

  if (count === this.urls.length) {
    zip.generateAsync({type: 'blob'}).then((content) => {
      const objectUrl: string = URL.createObjectURL(content);
      const link: any = document.createElement('a');

      link.download = 'sample-pdf-files.zip';
      link.href = objectUrl;
      link.click();
    });
  }
});
});
}
///


}


