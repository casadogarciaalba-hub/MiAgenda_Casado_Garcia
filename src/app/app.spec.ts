import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('calcula las iniciales', () => {
    const app = TestBed.createComponent(App).componentInstance;
    expect(app.iniciales('Lucía Martín')).toBe('LM');
    expect(app.iniciales('marta sánchez lópez')).toBe('MS');
  });
});
