import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Empresa, NuevaEmpresaDTO } from '../models/empresa.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private empresas: Empresa[] = [];
  private empresas$ = new BehaviorSubject<Empresa[]>([]);
  constructor() {
    // get data from localStorage
    this.inciarConexion();
  }

  get obtenerEmpresas(): Observable<Empresa[]> {
    return this.empresas$.asObservable();
  }

  getEmpresaPorId(id: string): Empresa | undefined {
    return this.empresas.find((empresa) => empresa.id === id);
  }

  agregarNuevaEmpresa(nuevaEmpresa: NuevaEmpresaDTO) {
    let nuevoID = 1;
    if (this.empresas.length > 0) {
      const lastEmpresa = this.empresas[this.empresas.length - 1];
      nuevoID = parseInt(lastEmpresa.id) + 1;
    }
    const Empresa: Empresa = { id: nuevoID.toString(), ...nuevaEmpresa };
    this.empresas.push(Empresa);
    this.empresas$.next(this.empresas);
    this.poblarAlmacenamiento();
  }

  actualizarEmpresa(nuevaEmpresa: Empresa) {
    const index = this.empresas.findIndex(
      (Empresa) => Empresa.id === nuevaEmpresa.id
    );

    if (index >= 0) {
      this.empresas.splice(index, 1, nuevaEmpresa);
      this.empresas$.next(this.empresas);

      this.poblarAlmacenamiento();
    }
  }

  eliminarEmpresa(id: string): Empresa | undefined {
    const EmpresaAEliminar = this.getEmpresaPorId(id);
    if (EmpresaAEliminar) {
      this.empresas = this.empresas.filter((empresa) => empresa.id != id);
      this.empresas$.next(this.empresas);
      this.poblarAlmacenamiento();
    }
    return EmpresaAEliminar;
  }

  private inciarConexion() {
    const datos: string | null = localStorage.getItem('empresas');
    if (datos) {
      this.empresas = JSON.parse(datos);
      this.empresas$.next(this.empresas);
    } else {
      this.poblarAlmacenamiento();
    }
  }

  private poblarAlmacenamiento() {
    const datos: string = JSON.stringify(this.empresas);
    localStorage.setItem('empresas', datos);
  }
}
