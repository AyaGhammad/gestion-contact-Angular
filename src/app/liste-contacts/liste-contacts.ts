import { Component, input, output, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Contact } from '../contact.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-liste-contacts',
  imports: [FormsModule,CommonModule],
  templateUrl: './liste-contacts.html',
  styleUrls: ['./liste-contacts.css']
})
export class ListeContacts implements OnInit, OnChanges, OnDestroy {
  contacts=input<Contact[]> ([]);
  contactSupprime = output<number>();

  dateChargement: string = '';
  nombreAjouts: number = 0;//s'incremente a chaque modification(ajout ou suppression)
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
    if (!this.recherche.trim()) return this.contacts();
    const terme = this.recherche.toLowerCase();
    return this.contacts().filter(c =>
      c.nom.toLowerCase().includes(terme) ||
      c.email.toLowerCase().includes(terme)
    );
  }
}