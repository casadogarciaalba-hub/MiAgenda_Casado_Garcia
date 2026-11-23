import { Component, computed, signal } from '@angular/core';

// Forma de cada contacto: los seis campos de contactos.json
export interface Contacto {
  id: number;
  nombre: string;
  telefono: string;
  email: string;
  grupo: string;
  favorito: boolean;
}

// Clave con la que guardamos los favoritos en localStorage (reto extra 2)
const CLAVE_FAVORITOS = 'miagenda-favoritos';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // ---------- Estado (signals) ----------

  // Lista de contactos: empieza vacía y se rellena con cargar()
  contactos = signal<Contacto[]>([]);

  // Texto escrito en el buscador
  busqueda = signal('');

  // Grupo elegido en los botones de filtro (reto extra 1)
  grupoActivo = signal('Todos');
  grupos = ['Todos', 'Clase', 'Familia', 'Trabajo'];

  // ---------- Valores calculados (computed) ----------

  // Cuántos contactos tienen estrella
  numFavoritos = computed(() => this.contactos().filter((c) => c.favorito).length);

  // Contactos que cumplen el buscador y el grupo a la vez
  filtrados = computed(() => {
    const texto = this.busqueda().toLowerCase();
    const grupo = this.grupoActivo();

    return this.contactos().filter(
      (c) =>
        c.nombre.toLowerCase().includes(texto) &&
        (grupo === 'Todos' || c.grupo === grupo),
    );
  });

  constructor() {
    this.cargar();
  }

  // ---------- Métodos ----------

  // Lee el JSON con fetch + async/await y lo guarda en el signal
  async cargar(): Promise<void> {
    try {
      const respuesta = await fetch('/contactos.json');
      const datos: Contacto[] = await respuesta.json();

      // Si hay favoritos guardados de otra visita, se aplican encima del JSON
      const guardados = this.leerFavoritos();
      if (guardados) {
        this.contactos.set(datos.map((c) => ({ ...c, favorito: guardados.includes(c.id) })));
      } else {
        this.contactos.set(datos);
      }
    } catch (error) {
      console.error('No se han podido cargar los contactos', error);
    }
  }

  // "Lucía Martín" -> "LM": primera letra de las dos primeras palabras
  iniciales(nombre: string): string {
    return nombre
      .split(' ')
      .slice(0, 2)
      .map((palabra) => palabra.charAt(0).toUpperCase())
      .join('');
  }

  // Devuelve una lista NUEVA con el favorito de ese contacto al revés
  cambiarFavorito(id: number): void {
    this.contactos.update((lista) =>
      lista.map((c) => (c.id === id ? { ...c, favorito: !c.favorito } : c)),
    );
    this.guardarFavoritos();
  }

  // Guarda el texto del buscador
  buscar(texto: string): void {
    this.busqueda.set(texto);
  }

  // Cambia el grupo del filtro
  elegirGrupo(grupo: string): void {
    this.grupoActivo.set(grupo);
  }

  // ---------- localStorage (reto extra 2) ----------

  private guardarFavoritos(): void {
    const ids = this.contactos()
      .filter((c) => c.favorito)
      .map((c) => c.id);
    try {
      localStorage.setItem(CLAVE_FAVORITOS, JSON.stringify(ids));
    } catch {
      // Si el navegador no deja usar localStorage, la app sigue funcionando igual
    }
  }

  private leerFavoritos(): number[] | null {
    try {
      const texto = localStorage.getItem(CLAVE_FAVORITOS);
      return texto ? JSON.parse(texto) : null;
    } catch {
      return null;
    }
  }
}
