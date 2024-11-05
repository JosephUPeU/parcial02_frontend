import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Escuela } from '../models/escuela'; // Asegúrate de que esta ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class EscuelaService {
  private apiUrl = 'http://localhost:8080/api/escuela'; // Cambia la URL según tu backend

  constructor(private http: HttpClient) {}

  // Obtener todas las escuelas
  getAll(): Observable<Escuela[]> {
    return this.http.get<Escuela[]>(this.apiUrl);
  }

  // Obtener una escuela por ID
  getById(id: number): Observable<Escuela> {
    return this.http.get<Escuela>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva escuela
  create(escuela: Escuela): Observable<Escuela> {
    return this.http.post<Escuela>(this.apiUrl, escuela);
  }

  // Actualizar una escuela existente
  update(id: number, escuela: Escuela): Observable<Escuela> {
    return this.http.put<Escuela>(`${this.apiUrl}/${id}`, escuela);
  }

  // Eliminar una escuela por ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
