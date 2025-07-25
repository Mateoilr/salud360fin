import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-test-diario-mujer',
  templateUrl: './test-diario-mujer.page.html',
  styleUrls: ['./test-diario-mujer.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TestDiarioMujerPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
