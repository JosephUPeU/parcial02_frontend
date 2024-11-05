export class Escuela {
    id: number;
    nombre: string;
    id_facultad: number;
  
    constructor(id: number, nombre: string, id_facultad: number) {
      this.id = id;
      this.nombre = nombre;
      this.id_facultad = id_facultad;
    }
  }