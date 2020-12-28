import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { GenerateCertificateService } from './services/generateCertificate/generate-certificate.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  VIDEOGAMES = [
    {
      id: 1,
      name: 'Animal Crossing',
      platform: 'Nintendo Switch',
      reference: '1-770-736-8031',
    },
    {
      id: 2,
      name: 'The Legend of Zelda: Ocarina of Time CV',
      platform: 'Wii U',
      reference: '1-770-736-2323',
    },
    {
      id: 3,
      name: 'Metal Gear Solid',
      platform: 'Playstation (PSX)',
      reference: '1-4564-736-334',
    },
    {
      id: 4,
      name: 'ShenMue',
      platform: 'Sega Dreamcast',
      reference: '3-770-736-4532',
    },
    {
      id: 5,
      name: 'Rise of the Tomb Raider',
      platform: 'Playstation 4',
      reference: '1-324-736-3245',
    },
    {
      id: 6,
      name: 'Resident Evil 2',
      platform: 'Playstation',
      reference: '1-123-3336-4321',
    },
  ];

  resolvePassword: FormGroup;
  hide = true;
  hideConfirm = true;
  periodicidad = true;
  document = 'Seleccione';
  certifiedYearValue = 'Seleccione';
  certifiedPeriodValue = 'Seleccione';
  certifiedMunicipalityValue = 'Seleccione';

  datos: any = {};
  servicios: any[] = [];
  filteredServList: Observable<any>;
  myControl = new FormControl();
  period: any[] = [];
  dataListCertificate: any[] = [];
  filteredPeriod: Observable<any>;


  iconPass: string = 'visibility_off';
  view: string = 'password';
  uid: "agarcia1";
  certifiedYear = false;
  certifiedPeriodicity = false;
  certifiedPeriod = false;
  certifiedMunicipality = false;

  constructor(private fb: FormBuilder,
              private generateCertificate: GenerateCertificateService,
              public spinnerService: NgxSpinnerService,
              ) { }

  ngOnInit(): void {

    this.filterCertificate();
  }

  filterCertificate() {

    this.resolvePassword = this.fb.group({
      documentType: ['', [Validators.required]],
      servicio: [''],
      period: [''],
      periocidad: ['',],
      municipio: ['', [Validators.required]],
    });

  }

  checkList(itemsChek: string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        const item = control.value;
        if (item.length > 0 && !itemsChek.includes(item)) {
            return { 'matchList': item };
        }
        return null;
    };
}

  onSubmit(): void {

    if (this.resolvePassword.valid) {

      this.downloadPDF();

    }

  }


  // tslint:disable-next-line:typedef
  downloadPDF() {
    /* const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    doc.text('Hello world!', 10, 10);
    doc.save('hello-world.pdf');

    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });  */
    var logo = new Image();
    logo.src = './assets/images/fsfb.png';

    let doc = new jsPDF();
    doc.addImage(logo, 'JPEG', 10, 5, 50, 20);
    doc.setFont('helvetica');
    doc.setFontType('bold');
    doc.setFontSize(12);
    doc.text(60, 30, 'Certificado de Retención en la fuente por IVA');
    doc.text(92, 35, 'Año garvable');
    doc.text(68, 40, 'FUNDACIÓN SANTA FE DE BOGOTÁ');
    doc.text(87, 45, 'NIT: 860037950 - 2');
    doc.text(63, 50, 'CALLE 119 No. 7 - 75 TELEFONO 6030303');
    doc.text(78, 55, 'BOGOTÁ D.C - COLOMBIA');
    doc.save('hello-world.pdf');
  }

  close(): void {


  }

  selectDocumentType(document: string) {

    this.spinnerService.show();

    this.datos.nitTercero = '167307276';
    this.datos.typeCertificate = document;

    this.generateCertificate.queryCertificate(this.datos).subscribe(
      (data) => {
        this.spinnerService.hide();
        this.certifiedYear = true;
        console.log(data);
        this.servicios = data;
        this.filteredServList = this.myControl.valueChanges
            .pipe(
              startWith(''),
              map(value => typeof value === 'string' ? value : value.name),
              map(name => name ? this.__filter(name) : this.servicios.slice())
            );


      }, (error: HttpErrorResponse) => {
         this.spinnerService.hide();
         console.log(error);

         /*
         swal({
          title: 'Error',
          text: 'El usuario no tiene ningún certificado.',
          icon: 'error',
        });  */
      }
    );


  }

  private _filter(name: string): any {
    const filterValue = name.toLowerCase();

    return this.servicios.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private __filter(name: string): any {
    const filterValue = name.toLowerCase();

    return this.servicios.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }



  displayFn(item) {
    return item ? item.descripcion : undefined;
  }



  selectCertifiedYear(document): any {

    console.log("Test ", document );

    this.datos.year = document.year;
    this.certifiedPeriod = true;

    this.generateCertificate.listMonths(this.datos).subscribe(
      (data) => {

        this.certifiedYear = true;
        console.log(data);
        this.period = data;
        this.filteredPeriod = this.myControl.valueChanges
            .pipe(
              startWith(''),
              map(value => typeof value === 'string' ? value : value.name),
              map(name => name ? this._filter(name) : this.period.slice())
            );


      }, (error: HttpErrorResponse) => {
         console.log(error);

         /*
         swal({
          title: 'Error',
          text: 'El usuario no tiene ningún certificado.',
          icon: 'error',
        });  */
      }
    );
  }

  selectCertifiedPeriod(document): any {

    this.certifiedMunicipality = true;
    this.datos.monthOne = document.periodo;

    console.log("Test 2", this.datos);


    if (document.periodo === 'ENERO') {

    this.datos.monthTwo = 'FEBRERO';

    } else if(document.periodo === 'MARZO')  {

    this.datos.monthTwo = 'ABRIL';

    } else if(document.periodo === 'MAYO')  {

    this.datos.monthTwo = 'JUNIO';

    }else if(document.periodo === 'JULIO')  {

    this.datos.monthTwo = 'AGOSTO';

    }else if(document.periodo === 'SEPTIEMBRE')  {

    this.datos.monthTwo = 'OCTUBRE';

    }else if(document.periodo === 'NOVIEMBRE')  {

    this.datos.monthTwo = 'DICIEMBRE';

    }

    console.log("Test 3", this.datos);

  }

  selectCertifiedMunicipality(document): any {

    this.datos.crMunicipio = document;
    console.log(this.datos);

    this.generateCertificate.generateCertificate(this.datos).subscribe(
      (data) => {

        console.log(data);
        this.dataListCertificate = data;
        console.log(this.dataListCertificate);


      }, (error: HttpErrorResponse) => {
         console.log(error);

         /*
         swal({
          title: 'Error',
          text: 'El usuario no tiene ningún certificado.',
          icon: 'error',
        });  */
      }
    );

  }


}
