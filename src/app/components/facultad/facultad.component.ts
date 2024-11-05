import { Component, OnInit } from '@angular/core';
import { FacultadService } from '../../services/facultad.service';
import { Facultad } from '../../models/facultad';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-facultad',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './facultad.component.html',
  styleUrls: ['./facultad.component.css']
})
export class FacultadComponent implements OnInit {
  facultades: Facultad[] = [];
  selectedFacultad: Facultad = new Facultad(0, '');
  isEditing: boolean = false;
  isAdding: boolean = false;

  constructor(private facultadService: FacultadService) {}

  ngOnInit(): void {
    this.getFacultades();
  }

  getFacultades(): void {
    this.facultadService.getAll().subscribe(data => {
      this.facultades = data;
    });
  }

  showAddForm(): void {
    this.isAdding = true;
    this.isEditing = false;
    this.selectedFacultad = new Facultad(0, '');
  }

  editFacultad(facultad: Facultad): void {
    this.isEditing = true;
    this.isAdding = false;
    this.selectedFacultad = { ...facultad };
  }

  saveFacultad(): void {
    if (this.isEditing) {
      this.facultadService.update(this.selectedFacultad.id, this.selectedFacultad).subscribe(updated => {
        const index = this.facultades.findIndex(f => f.id === updated.id);
        if (index !== -1) {
          this.facultades[index] = updated;
        }
        this.resetForm();
      });
    } else if (this.isAdding) {
      this.facultadService.create(this.selectedFacultad).subscribe(newFacultad => {
        this.facultades.push(newFacultad);
        this.resetForm();
      });
    }
  }

  deleteFacultad(id: number): void {
    this.facultadService.delete(id).subscribe(() => {
      this.facultades = this.facultades.filter(f => f.id !== id);
    });
  }

  cancel(): void {
    this.resetForm();
  }

  private resetForm(): void {
    this.isEditing = false;
    this.isAdding = false;
    this.selectedFacultad = new Facultad(0, '');
  }
}
