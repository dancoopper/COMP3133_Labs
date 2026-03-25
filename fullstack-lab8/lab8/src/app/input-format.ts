import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputFormat]',
  standalone: false,
})
export class InputFormat {
  constructor(private el: ElementRef) { }

  @HostListener('blur') onBlur() {
    this.el.nativeElement.value = this.el.nativeElement.value.toUpperCase();
  }
}