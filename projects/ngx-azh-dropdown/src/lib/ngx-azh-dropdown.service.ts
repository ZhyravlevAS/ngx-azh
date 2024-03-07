import {ComponentRef, Injectable, OnDestroy, Renderer2, RendererFactory2, Type, ViewContainerRef,} from '@angular/core';
import {Router} from '@angular/router';
import * as Popper from '@popperjs/core';
import {OptionsGeneric} from '@popperjs/core';
import {Placement} from '@popperjs/core/lib/enums';
import * as _ from 'lodash';
import {of, Subject, takeUntil} from 'rxjs';
import {delay} from 'rxjs/operators';
import {NgxAzhDropdownVirtualElement} from './ngx-azh-dropdown-virtual-element';
import {NgxAzhDropdownDataComponent, NgxAzhDropdownOptions} from "./ngx-azh-dropdown";

@Injectable({
  providedIn: 'root',
})
export class NgxAzhDropdownService implements OnDestroy {
  /**
   * A static reference to a view container.
   */
  public static host: ViewContainerRef | undefined;

  /**
   * Menu close event.
   */
  public closePreviousEvent: Subject<void> = new Subject<void>();

  /**
   * Array of window component instances.
   * @type {Array}
   */
  private components: any[] = [];
  private renderer: Renderer2;
  private readonly waitTime: number = 350;
  private readonly cssClassName: string = 'filter--is-open';
  private readonly zIndex: number = 1002;
  private destroy$ = new Subject<void>();

  constructor(private rendererFactory: RendererFactory2, private router: Router) {
    this.renderer = this.rendererFactory.createRenderer(null, null);

    // Subscribe to the closing event.
    this.closePreviousEvent.pipe(takeUntil(this.destroy$)).subscribe(() => {
      const ref = this._lastRef;

      if (!ref) {
        return;
      }

      this.closeBy(ref.uid);
    });

    this.router.events.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.clearAll();
    });
  }

  /**
   * Flag whether there are any created menus.
   * @returns {boolean}
   */
  public get hasMenu(): boolean {
    if (!NgxAzhDropdownService.host) {
      return false;
    }

    return NgxAzhDropdownService.host?.length > 0;
  }

  /**
   * Returns references to the last window component.
   * @returns {any}
   * @private
   */
  private get _lastRef(): NgxAzhDropdownDataComponent | undefined {
    const viewContainerRef = NgxAzhDropdownService.host;

    if (!viewContainerRef) {
      return undefined;
    }

    const lastIndex = viewContainerRef.length - 1;
    const data: any = this.components[lastIndex];

    if (!data) {
      return undefined;
    }

    return {
      lastIndex,
      componentViewRef: viewContainerRef.get(lastIndex),
      uid: data.uid,
      component: data.component,
      popper: data.popper,
      button: data.button,
    };
  }

  /**
   * ngOnDestroy
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Component creation.
   * @param button
   * @param view
   * @param dropOptions
   */
  public create<T>(button: HTMLElement | NgxAzhDropdownVirtualElement, view: Type<T>, dropOptions?: NgxAzhDropdownOptions,): ComponentRef<T> | null {
    const viewContainerRef = NgxAzhDropdownService.host;

    console.log('NgxAzhDropdownService.create --->', viewContainerRef);

    if (!viewContainerRef) {
      return null;
    }

    console.log('NgxAzhDropdownService.create ---> this.components', this.components);


    // Close the previous one when creating a new one, if any
    if (this.components.length) {
      // If you clicked on the same button, then you just need to close the current menu
      if (this.components[0].button.isEqualNode(button)) {
        this.closeBy(this.components[0].uid);
        return null;
      }

      // Otherwise, close the previous one and create a new one below.
      this.closePreviousEvent.next();
    }

    const component = viewContainerRef.createComponent<T>(view);
    const uid = Math.random().toString(36).substring(7); // Unique button ID
    const popper = this._popper(button, component.location.nativeElement, dropOptions?.menuWidth, dropOptions?.placement, dropOptions?.popperCustomOptions,);

    if (button instanceof NgxAzhDropdownVirtualElement) {
    } else {
      this.renderer.setAttribute(button, 'data-uid', uid);
    }

    of(true)
      .pipe(takeUntil(this.destroy$), delay(50))
      .subscribe(() => {
        this.renderer.addClass(component.location.nativeElement, this.cssClassName);
        this.renderer.setStyle(component.location.nativeElement, 'z-index', dropOptions?.zIndex ? dropOptions.zIndex : this.zIndex,);
        popper.update();
      });

    // Add all the info to the array
    this.components.unshift({
      uid, component, button, popper,
    });

    component.changeDetectorRef.markForCheck();
    return component;
  }

  /**
   * Delete everything.
   */
  public clearAll() {
    _.forEach(this.components, (c: any) => c.popper.destroy()); // remove all popper
    this.components = [];
    NgxAzhDropdownService.host?.clear();
  }

  /**
   *
   */
  public closePrevious(): void {
    this.closePreviousEvent.next();
  }

  /**
   *
   * @param uid
   */
  public closeBy(uid: string): void {
    if (!uid) {
      throw new Error('UID is missing!');
    }

    const data: NgxAzhDropdownDataComponent = _.find(this.components, (c: NgxAzhDropdownDataComponent) => c.uid === uid,);

    if (_.isUndefined(data)) {
      return;
    }

    this.renderer.removeClass(data.component.location.nativeElement, this.cssClassName);

    of(true)
      .pipe(delay(this.waitTime))
      .subscribe(() => {
        _.remove(this.components, (c: NgxAzhDropdownDataComponent) => c.uid === uid);
        data.component.hostView.destroy();
      });
  }

  /**
   *
   * @param button
   * @param target
   * @param menuWidth
   * @param placement
   * @param popperCustomOptions
   * @private
   */
  private _popper(button: HTMLElement | NgxAzhDropdownVirtualElement, target: any, menuWidth?: number | 'default', placement: Placement = 'auto-start', popperCustomOptions?: OptionsGeneric<any>,): any {
    if (button instanceof NgxAzhDropdownVirtualElement) {
      button = button.virtualElement;
    }

    return Popper.createPopper(button as Element | import("@popperjs/core/lib/types").VirtualElement, target, popperCustomOptions ? popperCustomOptions : {
      placement, modifiers: [{
        name: 'sameWidth',
        enabled: true,
        // @ts-ignore
        fn: ({state}) => {
          if (menuWidth === 'default') {
            return;
          }

          if (menuWidth) {
            state.styles.popper.width = `${menuWidth}px`;
            return;
          }

          state.styles.popper.width = `${state.rects.reference.width}px`;
        }, phase: 'beforeWrite', requires: ['computeStyles'],
      },],
    },);
  }
}
