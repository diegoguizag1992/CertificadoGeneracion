import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import jsPDF from 'jspdf';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { GenerateCertificateService } from 'src/app/services/generateCertificate/generate-certificate.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-generar-certificado',
  templateUrl: './generar-certificado.component.html',
  styleUrls: ['./generar-certificado.component.css']
})
export class GenerarCertificadoComponent implements OnInit {
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
  certifiedYearSpinner = false;

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

   // if (this.resolvePassword.valid) {

      this.downloadPDF();

   //  }

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
    this.spinnerService.show();

    var logo = new Image();
    logo.src = './assets/images/fsfb.png';

    let doc = new jsPDF();
    doc.addImage(logo, 'JPEG', 10, 5, 50, 20);
    doc.setFont('helvetica');
    doc.setFontType('bold');
    doc.setFontSize(10);
    doc.text(68, 30, 'Certificado de Retención en la fuente por IVA');
    doc.text(95, 35, 'Año garvable');
    doc.text(75, 40, 'FUNDACIÓN SANTA FE DE BOGOTÁ');
    doc.text(92, 45, 'NIT: 860037950 - 2');
    doc.text(72, 50, 'CALLE 119 No. 7 - 75 TELEFONO 6030303');
    doc.text(85, 55, 'BOGOTÁ D.C - COLOMBIA');

    doc.text(96, 70, 'CERTIFICA');
    doc.setFont('helvetica');
    doc.setFontType('normal');
    doc.setFontSize(10);
    doc.text(20, 75, `Que durante el periodo comprendido entre 01/01/2019 y 31/12/2019 en la ciudad de BOGOTA D.C se práctico`);
    doc.text(20, 80, `y consignó retención en la fuente Título de Renta a:`);

    doc.setFont('helvetica');
    doc.setFontType('bold');
    doc.setFontSize(10);
    doc.text(62, 95, 'INGENIERIA CLINICA A SU SERVICIO INCLISER LTDA');
    doc.text(97, 100, '9001800693');

    doc.text(30, 115, 'PERIODO');
    doc.text(60, 115, 'CONCEPTO');
    doc.text(110, 115, 'BASE');
    doc.text(130, 115, 'PORCENTAJE');
    doc.text(170, 115, 'RETENCIÓN');

    //  Porcentajes PDF
    doc.setFont('helvetica');
    doc.setFontType('normal');
    doc.setFontSize(10);






    doc.setFont('helvetica');
    doc.setFontType('bold');
    doc.setFontSize(10);
    doc.text(20, 160, 'VALOR RETENIDO:');
    doc.text(20, 165, 'SEISCIENTOS CINCUENTA Y TRES MIL TRESCIENTOS SETENTA Y CINCO');
    doc.setFont('helvetica');
    doc.setFontType('normal');
    doc.setFontSize(7);
    doc.text(20, 175, 'LA BASE DE RETENCIÓN EN LA FUENTE, CORRESPONDE AL 100% DE SUS INGRESOS MENOS LAS DEDUCCIONES DE LEY SEGÚN EL ARTÍCULO');
    doc.text(20, 180, '126 DEL ESTATUTO TRIBUTARIO (AFC, APORTES OBLIGATORIOS Y/O VOLUNTARIOS DE PENSIÓN), EN CASO DE TENERLOS.');

    doc.setFont('helvetica');
    doc.setFontType('bold');
    doc.setFontSize(10);
    doc.text(20, 200, 'FUNDACION SANTA FE DE BOGOTA');
    doc.text(20, 205, 'NIT: 860037950-2');
    doc.text(20, 210, 'FECHA DE EXPEDICION 05/03/2020');

    doc.setFont('helvetica');
    doc.setFontType('normal');
    doc.setFontSize(7);
    doc.text(20, 220, 'NOTA: LAS PERSONAS JURIDICAS PODRAN ENTREGAR LOS CERTIFICADOS DE RETENCION EN LA FUENTE, EN FORMA CONTINUA IMPRESA');
    doc.text(20, 225, 'POR COMPUTADOR, SIN NECESIDAD DE FIRMA AUTOGRAFA (D.R. 836/91)LOS DOCUMENTOS QUE SE ENCUENTRAN ALMACENADOS EN');
    doc.text(20, 230, 'MEDIOS MAGNÉTICOS O ELECTRÓNICOS PUEDAN SER IMPRESOS EN CUALQUIER PARTE UTILIZANDO EL COMPUTADOR, YA SEA EN LA SEDE');
    doc.text(20, 235, 'DEL AGENTE DE RETENCIÓN O EN LA SEDE DEL RETENIDO (CONCEPTO DIAN 105489 DE 24-12-2007).LA UTILIZACION DE ESTE CERTIFICADO');
    doc.text(20, 240, 'EN LAS DECLARACIONES TRIBUTARIAS QUE SE SURTAN ANTE LAS AUTORIDADES COMPETENTES ES RESPONSABILIDAD EXCLUSIVA DE LA(S)');
    doc.text(20, 245, 'PERSONA(S) EN CUYO FAVOR SE EXPIDE.');


    doc.setFont('helvetica');
    doc.setFontType('bold');
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 255);
    doc.text(50, 260, 'Calle 119 No. 7–75 Teléfono: 6030303 Fax: 6575714 Bogotá, D.C');
    doc.text(90, 265, 'www.fsfb.org.co');





















    doc.save('hello-world.pdf');

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinnerService.hide();
    }, 8000);

  }

  close(): void {


  }

  selectDocumentType(document: string) {

    console.log("entro");
    this.spinnerService.show();
    this.certifiedYearSpinner = true;


    this.datos.nitTercero = '167307276';
    this.datos.typeCertificate = document;

    this.generateCertificate.queryCertificate(this.datos).subscribe(
      (data) => {
        this.spinnerService.hide();
        this.certifiedYear = true;
        console.log(data);
        this.servicios = data;

        /*
        this.filteredServList = this.myControl.valueChanges
            .pipe(
              startWith(''),
              map(value => typeof value === 'string' ? value : value.name),
              map(name => name ? this.__filter(name) : this.servicios.slice())
            );  */


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

    console.log("entro 2");

    this.spinnerService.show();
    this.datos.year = document.year;

    this.generateCertificate.listMonths(this.datos).subscribe(
      (data) => {
        this.spinnerService.hide();
        //this.certifiedYear = true;
        this.certifiedPeriod = true;
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

    // this.spinnerService.show();

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
    // this.spinnerService.show();

    this.generateCertificate.generateCertificate(this.datos).subscribe(
      (data) => {
       // this.spinnerService.hide();
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
