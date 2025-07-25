import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-ciclo-menstrual',
  templateUrl: './ciclo-menstrual.page.html',
  styleUrls: ['./ciclo-menstrual.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CicloMenstrualPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
