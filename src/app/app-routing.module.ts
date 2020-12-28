import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenerarCertificadoComponent } from './component/logeado/generar-certificado/generar-certificado.component';
import { GenerateCertificateService } from './services/generateCertificate/generate-certificate.service';

const routes: Routes = [
  {
    path: '',
    component: GenerateCertificateService
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
