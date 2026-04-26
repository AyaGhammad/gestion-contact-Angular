import { Component, Input, Output, EventEmitter, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Contact } from '../contact.interface';

@Component({
  selector: 'app-liste-contacts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './liste-contacts.html',
  styleUrls: ['./liste-contacts.css']
})
export class ListeContacts implements OnInit, OnChanges, OnDestroy {
  @Input() contacts: Contact[] = [];
  @Output() contactSupprime = new EventEmitter<number>();

  dateChargement: string = '';
  nombreAjouts: number = 0;
  recherche: string = '';

  constructor() {
    console.log('[1] constructor() appelé');
  }

  ngOnInit(): void {
    console.log('[2] ngOnInit() appelé');
    console.log('Contacts reçus :', this.contacts.length);
    this.dateChargement = new Date().toLocaleTimeString('fr-FR');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contacts']) {
      const avant = changes['contacts'].previousValue;
      const apres = changes['contacts'].currentValue;
      const premier = changes['contacts'].firstChange;
      console.log('ngOnChanges() appelé');
      console.log('  Premier appel ?', premier);
      console.log('  Avant :', avant?.length ?? 0, 'contact(s)');
      console.log('  Après :', apres?.length ?? 0, 'contact(s)');
      if (!premier) this.nombreAjouts++;
    }
  }

  ngOnDestroy(): void {
    console.log('[3] ngOnDestroy() appelé - nettoyage');
  }

  supprimer(index: number): void {
    if (confirm('Confirmer la suppression ?')) {
      this.contactSupprime.emit(index);
    }
  }

  // Filtre de recherche (propriété calculée)
  get contactsFiltres(): Contact[] {
    if (!this.recherche.trim()) return this.contacts;
    const terme = this.recherche.toLowerCase();
    return this.contacts.filter(c =>
      c.nom.toLowerCase().includes(terme) ||
      c.email.toLowerCase().includes(terme)
    );
  }
}