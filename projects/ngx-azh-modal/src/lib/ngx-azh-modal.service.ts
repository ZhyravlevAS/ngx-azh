import {
  ComponentRef,
  ElementRef,
  Injectable,
  Injector,
  Renderer2,
  RendererFactory2,
  Type,
  ViewContainerRef
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { NgxAzhModalComponentInterface, NgxAzhModalOptionsInterface, NgxAzhModalSizeEnum } from './ngx-azh-modal';
import { NgxAzhModalConfigToken } from './ngx-azh-modal-config';

@Injectable({
    providedIn: 'root',
})
export class NgxAzhModalService {
    public static host: ViewContainerRef | undefined;
    public static backdrop: ElementRef | undefined;

    private renderer: Renderer2;

    constructor(
        private readonly rendererFactory: RendererFactory2,
        private readonly router: Router,
        private readonly injector: Injector,
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
        const host = NgxAzhModalService.host;
        const backdrop = NgxAzhModalService.backdrop;

        if (!host || !backdrop) {
          console.warn(
            `Host or backdrop is not initialized.`,
          );
          return null;
        }

        options = {...this.injector.get(NgxAzhModalConfigToken), ...options};
        // Exit if a "do not show again" id was passed, and it exists in localStorage.
        if (
            typeof options?.dontShowAgainId === 'string' &&
            options.dontShowAgainId.length > 0 &&
            window.localStorage.getItem(options.dontShowAgainId) !== null
        ) {
            return null;
        }

        // Create component
        let modal = host.createComponent<T>(component);

        // Add size
        let styledClass: string | null = null;

        switch (options?.size) {
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

        this.renderer.addClass(modal.location.nativeElement, styledClass);

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

        fromEvent<MouseEvent>(backdrop.nativeElement, 'mousedown')
            .pipe(
                tap(({target}) => (prevTarget = target)),
                switchMap(() => fromEvent<MouseEvent>(backdrop.nativeElement, 'mouseup')),
                filter(() => prevTarget === backdrop.nativeElement && !options?.notClosed),
                takeUntil(destroy$),
            )
            .subscribe(() => {
                modal.instance.result.backdrop();
            });

        // Close by navigation
        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationStart && !options?.notClosed),
                takeUntil(destroy$),
            )
            .subscribe(() => {
                modal.instance.result.backdrop();
            });

        // Subscribe to result
        modal.instance.result.subscribe((event) => {
            const hasDontShowAgainId = typeof options?.dontShowAgainId === 'string' && options.dontShowAgainId.length > 0;

            if (event?.dontShowAgain && !hasDontShowAgainId) {
                console.warn(
                    `If you want to use "dontShowAgain" you need to pass the ID in the "dontShowAgainId" property when creating the window.`,
                );
            }

            if (event?.dontShowAgain && hasDontShowAgainId) {
                window.localStorage.setItem(options?.dontShowAgainId as string, '1');
            }

            modal.destroy();
        });

        modal.onDestroy(() => {
            destroy$.next();
            destroy$.complete();

            if (!host.length) {
                this.renderer.removeClass(document.body, 'azh-modal--open');
            }
        });

        if (host.length) {
            this.renderer.addClass(document.body, 'azh-modal--open');
        }

        modal.changeDetectorRef.markForCheck();

        return modal;
    }

    /**
     * Clear all modal windows.
     */
    public clear(): void {
        NgxAzhModalService.host?.clear();
    }

  /**
   * Returns the number of open modals
   */
  public get size(): number {
      return NgxAzhModalService.host?.length || 0;
    }
}
