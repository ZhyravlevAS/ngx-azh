import {ViewRef} from "@angular/core";
import {OptionsGeneric} from '@popperjs/core';
import {Placement} from '@popperjs/core/lib/enums';

export interface NgxAzhDropdownDataComponent {
  lastIndex: number;
  componentViewRef: ViewRef | null;
  uid: string;
  component: any;
  popper: any;
  button: any;
}

export interface NgxAzhDropdownOptions {
  zIndex?: number;
  menuWidth?: number | 'default';
  placement?: Placement;
  popperCustomOptions?: OptionsGeneric<any>;
}
