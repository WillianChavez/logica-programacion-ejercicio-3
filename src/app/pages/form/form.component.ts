import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NuevaEmpresaDTO, Empresa } from 'src/app/models/empresa.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  title: string = '';
  action: 'Agregar' | 'Actualizar' | 'none' = 'none';
  hoy: number;
  formEmpresa = this.fb.group({
    nombre: ['', Validators.required],
    NIT: ['', [Validators.required, Validators.pattern(/[0-9]{14}/)]],
    fechaDeFundacion: ['', Validators.required],
    direccion: ['', Validators.required],
  });

  private idEmpresaChoosen: string | undefined = undefined;

  constructor(
    private storeService: StoreService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.hoy = Date.now();
  }

  get nombre() {
    return this.formEmpresa.get('nombre');
  }

  get NIT() {
    return this.formEmpresa.get('NIT');
  }

  get direccion() {
    return this.formEmpresa.get('direccion');
  }

  get fechaDeFundacion() {
    return this.formEmpresa.get('fechaDeFundacion');
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idEmpresaChoosen = params['id'];
      if (this.idEmpresaChoosen) {
        this.action = 'Actualizar';
        this.title = 'Actualizar Empresa';
        this.fillData(this.idEmpresaChoosen);
      } else {
        this.action = 'Agregar';
        this.title = 'Agregar Nueva Empresa';
      }
    });
  }

  agregarNuevaEmpresa() {
    if (
      this.formEmpresa.valid == true &&
      this.direccion?.value != null &&
      this.nombre?.value != null &&
      this.fechaDeFundacion?.value != null &&
      this.NIT?.value != null
    ) {
      const nuevaEmpresa: NuevaEmpresaDTO = {
        nombre: this.nombre.value,
        direccion: this.direccion.value,
        NIT: this.NIT.value,
        fechaDeFundacion: this.fechaDeFundacion.value.toString(),
      };

      this.storeService.agregarNuevaEmpresa(nuevaEmpresa);
    }
  }

  actualizarEmpresa() {
    if (
      this.idEmpresaChoosen &&
      this.formEmpresa.valid == true &&
      this.direccion?.value != null &&
      this.nombre?.value != null &&
      this.fechaDeFundacion?.value != null &&
      this.NIT?.value != null
    ) {
      const empresa: Empresa = {
        id: this.idEmpresaChoosen,
        nombre: this.nombre?.value,
        direccion: this.direccion?.value,
        NIT: this.NIT?.value,
        fechaDeFundacion: this.fechaDeFundacion?.value.toString(),
      };

      this.storeService.actualizarEmpresa(empresa);
    }
  }

  fillData(id: string) {
    const empresa = this.storeService.getEmpresaPorId(id);
    if (empresa) {
      this.formEmpresa.setValue({
        nombre: empresa.nombre,
        NIT: empresa.NIT,
        direccion: empresa.direccion,
        fechaDeFundacion: empresa.fechaDeFundacion,
      });
    }
  }

  onSubmit() {
    if (this.formEmpresa.valid) {
      if (this.action === 'Agregar') {
        this.agregarNuevaEmpresa();
      } else if (this.action === 'Actualizar') {
        this.actualizarEmpresa();
      }
      this.router.navigate(['/']);
    } else {
      this.formEmpresa.markAllAsTouched();
    }
  }
}
