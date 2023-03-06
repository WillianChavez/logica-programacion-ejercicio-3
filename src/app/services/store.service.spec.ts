import { TestBed } from '@angular/core/testing';
import { Empresa } from '../models/empresa.model';
import { Observable } from 'rxjs';

import { StoreService } from './store.service';

describe('StoreService', () => {
  let service: StoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAllProducts Should return an observable', () => {
    let products$ = service.obtenerEmpresas;
    expect(products$).toBeInstanceOf(Observable<Empresa[]>);
  });
});
