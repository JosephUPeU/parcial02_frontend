import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Facultad } from '../models/facultad'; // Asegúrate de que esta ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class FacultadService {
  private apiUrl = 'http://localhost:8080/api/facultad'; // Cambia la URL según tu backend

  constructor(private http: HttpClient) {}

  // Obtener todas las facultades
  getAll(): Observable<Facultad[]> {
    return this.http.get<Facultad[]>(this.apiUrl);
  }

  // Obtener una facultad por ID
  getById(id: number): Observable<Facultad> {
    return this.http.get<Facultad>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva facultad
  create(facultad: Facultad): Observable<Facultad> {
    return this.http.post<Facultad>(this.apiUrl, facultad);
  }

  // Actualizar una facultad existente
  update(id: number, facultad: Facultad): Observable<Facultad> {
    return this.http.put<Facultad>(`${this.apiUrl}/${id}`, facultad);
  }

  // Eliminar una facultad por ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
