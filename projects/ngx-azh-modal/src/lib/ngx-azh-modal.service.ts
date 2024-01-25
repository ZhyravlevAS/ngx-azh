import { ComponentRef, ElementRef, Injectable, Renderer2, RendererFactory2, Type } from '@angular/core';
import {
  NgxAzhModalComponentInterface,
  NgxAzhModalOptionsInterface,
  NgxAzhModalSizeEnum,
} from './ngx-azh-modal';
import { NgxAzhModalHostDirective } from './ngx-azh-modal-host.directive';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NgxAzhModalService {
  public static host: NgxAzhModalHostDirective;
  public static backdrop: ElementRef;

  private renderer: Renderer2;

  constructor(
    private rendererFactory: RendererFactory2,
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  /**
   * Creates a modal window
   * @param component - Component reference. This should implement ModalComponentInterface
   * @param options - Options.
   */
  public open<T extends NgxAzhModalComponentInterface>(
    component: Type<T>,
    options?: NgxAzhModalOptionsInterface,
  ): ComponentRef<T> | null {
    // Exit if a "do not show again" id was passed, and it exists in localStorage.
    if (
      typeof options?.dontShowAgainId === 'string' &&
      options.dontShowAgainId.length > 0 &&
      window.localStorage.getItem(options.dontShowAgainId) !== null
    ) {
      return null;
    }

    // Create component
    let modal = NgxAzhModalService.host.viewContainerRef.createComponent<T>(component);

    // Add size
    if (options?.size) {
      let styledClass: string | null = null;

      switch (options.size) {
        case NgxAzhModalSizeEnum.MEDIUM:
          styledClass = 'azh-modal--medium';
          break;
        case NgxAzhModalSizeEnum.LARGE:
          styledClass = 'azh-modal--large';
          break;
        case NgxAzhModalSizeEnum.FULLSCREEN:
          styledClass = 'azh-modal--fullscreen';
          break;
        default:
          styledClass = 'azh-modal--small';
      }

      if (styledClass) {
        this.renderer.addClass(modal.location.nativeElement, styledClass);
      }
    }

    const destroy$ = new Subject<void>();

    // Close by escape
    fromEvent<KeyboardEvent>(document, 'keyup')
      .pipe(
        filter((event) => event.key === 'Escape' && !options?.notClosed),
        takeUntil(destroy$),
      )
      .subscribe(() => {
        modal.instance.result.escape();
      });

    // Close by click backdrop
    let prevTarget: EventTarget | null;

    fromEvent<MouseEvent>(NgxAzhModalService.backdrop.nativeElement, 'mousedown')
      .pipe(
        tap(({ target }) => (prevTarget = target)),
        switchMap(() => fromEvent<MouseEvent>(NgxAzhModalService.backdrop.nativeElement, 'mouseup')),
        filter(() => prevTarget === NgxAzhModalService.backdrop.nativeElement && !options?.notClosed),
        takeUntil(destroy$),
      )
      .subscribe(() => {
        modal.instance.result.backdrop();
      });

    // Subscribe to result
    modal.instance.result.subscribe((event) => {
      const id = typeof options?.dontShowAgainId === 'string' && options.dontShowAgainId.length > 0;

      if (event?.dontShowAgain && !id) {
        console.warn(
          `If you want to use "dontShowAgain" you need to pass the ID in the "dontShowAgainId" property when creating the window.`,
        );
      }

      if (event?.dontShowAgain && id) {
        window.localStorage.setItem(options.dontShowAgainId as string, '1');
      }

      modal.destroy();
    });

    modal.onDestroy(() => {
      destroy$.next();
      destroy$.complete();

      if (!NgxAzhModalService.host.viewContainerRef.length) {
        this.renderer.removeClass(document.body, 'azh-modal--open');
      }
    });

    if (NgxAzhModalService.host.viewContainerRef.length) {
      this.renderer.addClass(document.body, 'azh-modal--open');
    }

    modal.changeDetectorRef.markForCheck();

    return modal;
  }

  /**
   * Clear all modal windows.
   */
  public clear(): void {
    NgxAzhModalService.host.viewContainerRef.clear();
  }
}
