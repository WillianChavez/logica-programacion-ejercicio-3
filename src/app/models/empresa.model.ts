export interface Empresa {
  id: string;
  nombre: string;
  NIT: string;
  fechaDeFundacion: string;
  direccion: string;
}

export interface NuevaEmpresaDTO extends Omit<Empresa, 'id'> {}
