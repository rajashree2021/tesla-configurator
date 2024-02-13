import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-image',
  standalone: true,
  templateUrl: './image.component.html',
  imports: [
    NgOptimizedImage
  ],
  styleUrl: './image.component.scss'
})
export class ImageComponent {
  @Input() path: string | undefined = undefined;
  @Input() alt: string | undefined = undefined;
}
