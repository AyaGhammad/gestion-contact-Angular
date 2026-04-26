import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormulaireContact } from './formulaire-contact/formulaire-contact';
import { ListeContacts } from './liste-contacts/liste-contacts';
import { Contact } from './contact.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormulaireContact, ListeContacts],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  mesContacts: Contact[] = [];

  ngOnInit(): void {
    // Pré-remplissage avec 2 contacts de démonstration
    this.mesContacts = [
      { nom: 'Ali Benali', email: 'ali@example.com', telephone: '0600000001' },
      { nom: 'Sara Alami', email: 'sara@example.com', telephone: '0600000002' }
    ];
    console.log('AppComponent initialisé avec', this.mesContacts.length, 'contacts');
  }

  ajouterContact(contact: Contact): void {
    this.mesContacts = [...this.mesContacts, contact]; // nouvelle référence pour déclencher ngOnChanges
    console.log('Contact ajouté :', contact);
  }

  supprimerContact(index: number): void {
    this.mesContacts = this.mesContacts.filter((_, i) => i !== index);
    console.log(`Contact ${index} supprimé. Reste : ${this.mesContacts.length}`);
  }

  // Propriétés calculées pour les statistiques
  get nombreContacts(): number {
    return this.mesContacts.length;
  }

  get messageStatut(): string {
    if (this.mesContacts.length === 0) return 'Carnet vide';
    if (this.mesContacts.length === 1) return '1 contact';
    return `${this.mesContacts.length} contacts`;
  }
}