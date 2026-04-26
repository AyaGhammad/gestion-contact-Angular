import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Contact } from '../contact.interface';

@Component({
  selector: 'app-formulaire-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './formulaire-contact.html',
  styleUrls: ['./formulaire-contact.css']
})
export class FormulaireContact {
  nom: string = '';
  email: string = '';
  telephone: string = '';

  @Output() contactSauvegarde = new EventEmitter<Contact>();

  sauvegarder(): void {
    if (this.nom.trim() && this.email.trim()) {
      this.contactSauvegarde.emit({
        nom: this.nom,
        email: this.email,
        telephone: this.telephone
      });
      // Réinitialisation du formulaire
      this.nom = '';
      this.email = '';
      this.telephone = '';
    } else {
      alert('Veuillez remplir le nom et l\'email.');
    }
  }
}