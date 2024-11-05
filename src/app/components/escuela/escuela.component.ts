import { Component, OnInit } from '@angular/core';
import { EscuelaService } from '../../services/escuela.service';
import { Escuela } from '../../models/escuela';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-escuela',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './escuela.component.html',
  styleUrls: ['./escuela.component.css']
})
export class EscuelaComponent implements OnInit {
  escuelas: Escuela[] = [];
  selectedEscuela: Escuela = new Escuela(0, '', 0);
  isEditing: boolean = false;
  isAdding: boolean = false;

  constructor(private escuelaService: EscuelaService) {}

  ngOnInit(): void {
    this.getEscuelas();
  }

  getEscuelas(): void {
    this.escuelaService.getAll().subscribe(data => {
      this.escuelas = data;
    });
  }

  showAddForm(): void {
    this.isAdding = true;
    this.isEditing = false;
    this.selectedEscuela = new Escuela(0, '', 0);
  }

  editEscuela(escuela: Escuela): void {
    this.isEditing = true;
    this.isAdding = false;
    this.selectedEscuela = { ...escuela };
  }

  saveEscuela(): void {
    if (this.isEditing) {
      this.escuelaService.update(this.selectedEscuela.id, this.selectedEscuela).subscribe(updated => {
        const index = this.escuelas.findIndex(e => e.id === updated.id);
        if (index !== -1) {
          this.escuelas[index] = updated;
        }
        this.resetForm();
      });
    } else if (this.isAdding) {
      this.escuelaService.create(this.selectedEscuela).subscribe(newEscuela => {
        this.escuelas.push(newEscuela);
        this.resetForm();
      });
    }
  }

  deleteEscuela(id: number): void {
    this.escuelaService.delete(id).subscribe(() => {
      this.escuelas = this.escuelas.filter(e => e.id !== id);
    });
  }

  cancel(): void {
    this.resetForm();
  }

  private resetForm(): void {
    this.isEditing = false;
    this.isAdding = false;
    this.selectedEscuela = new Escuela(0, '', 0);
  }
}
