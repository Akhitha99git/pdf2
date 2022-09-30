import { Component,ViewChild,ElementRef, OnInit} from '@angular/core';
import jspdf, { jsPDF }from "jspdf";
import html2canvas from 'html2canvas';
import { textAlign } from 'html2canvas/dist/types/css/property-descriptors/text-align';
 import { exportElement } from "./export-element";
import { PdfMargins, PdfPageOrientation, PdfPageSettings } from '@syncfusion/ej2-pdf-export';
import { X_OK } from 'constants';
import { image } from 'html2canvas/dist/types/css/types/image';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
//  @ViewChild('content')el!: ElementRef<HTMLImageElement>;
  title = 'mypdf';
  public onClick(element) {
    exportElement(element, {
      
      paperSize: "A4",
  
    });

  }

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
      
      //  console.log(top_left_margin);
      // console.log(top_left_margin);
      // console.log(-(PDF_Height * i) + top_left_margin * 4);
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
// pdf.save()
pdf.save('HTML-Document.pdf');
  });
}
}


