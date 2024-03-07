export class NgxAzhDropdownVirtualElement {
  constructor(public x: number, public y: number,) {
  }

  public get virtualElement(): any {
    const generateGetBoundingClientRect = () => {
      return () => ({
        width: 0, height: 0, top: this.y, right: this.x, bottom: this.y, left: this.x,
      });
    };

    return {
      getBoundingClientRect: generateGetBoundingClientRect(),
    };
  }

  public isEqualNode(): boolean {
    return true;
  }
}
