import { Component } from '@angular/core';
import { Hero } from '../hero';
@Component({
  selector: 'app-heroes',
  standalone: false,
  templateUrl: './heroes.html',
  styleUrl: './heroes.css',
})
export class Heroes {
  hero: Hero = {
    id: 1,
    name: 'Windstorm',
  };
}
