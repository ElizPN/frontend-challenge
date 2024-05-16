import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core'

@Directive({
  selector: '[appFitText]',
})
export class FitTextDirective {
  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngAfterViewChecked(): void {
    this.adjustText()
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event): void {
    this.adjustText()
  }

  adjustText(): void {
    const targetElement = this.elRef.nativeElement
    const parentContainer = targetElement.parentElement

    const spacing = 10

    this.renderer.setStyle(targetElement, 'transform', 'scale(1)')

    const availableWidth = parentContainer.offsetWidth - spacing
    const contentWidth = targetElement.scrollWidth
    const scalingFactor = availableWidth / contentWidth

    this.renderer.setStyle(targetElement, 'transform', `scale(${scalingFactor})`)

    const naturalHeight = targetElement.scrollHeight
    const scaledHeight = naturalHeight * scalingFactor

    this.renderer.setStyle(parentContainer, 'height', `${scaledHeight}px`)
    this.renderer.setStyle(parentContainer, 'alignItems', 'center')
  }
}
