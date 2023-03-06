import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/models/empresa.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
})
export class EmpresasComponent implements OnInit {
  empresas: Empresa[] = [];

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.obtenerEmpresas.subscribe((datos) => {
      this.empresas = datos;
    });
  }

  eliminarEmpresa(id: string) {
    this.storeService.eliminarEmpresa(id);
  }
}
