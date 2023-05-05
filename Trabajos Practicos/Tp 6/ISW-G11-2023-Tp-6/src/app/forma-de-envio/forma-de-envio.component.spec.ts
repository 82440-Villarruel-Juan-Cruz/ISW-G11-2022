import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaDeEnvioComponent } from './forma-de-envio.component';

describe('FormaDeEnvioComponent', () => {
  let component: FormaDeEnvioComponent;
  let fixture: ComponentFixture<FormaDeEnvioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormaDeEnvioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormaDeEnvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
