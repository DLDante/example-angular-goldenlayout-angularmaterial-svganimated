import {
  Component,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  NgZone,
  ComponentRef,
  ViewEncapsulation,
} from '@angular/core';
import jQuery from 'jquery';
import GoldenLayout from 'golden-layout';
import { MainViewComponent } from './views/main-view/main-view.component';
import { SecondViewComponent } from './views/second-view/second-view.component';
import { ThirdViewComponent } from './views/third-view/third-view.component';

type NgComponent<T> = { new (...params: any[]): T };

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  public name = 'Angular';
  private layout: GoldenLayout = null;
  private config = {
    settings: {
      showPopoutIcon: false, //Angular SPA. it will not be working in multi window app
    },
    content: [
      {
        type: 'row',
        content: [
          {
            type: 'component',
            componentName: 'main',
          },
          {
            type: 'component',
            componentName: 'second',
          },
          {
            type: 'component',
            componentName: 'third',
          },
        ],
      },
    ],
  };

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private zone: NgZone
  ) {
    this.layout = new GoldenLayout(this.config);

    //reg components. this components must registred in angular as entryComponents (see app.module.ts)
    this.registerComponent('main', MainViewComponent);
    this.registerComponent('second', SecondViewComponent);
    this.registerComponent('third', ThirdViewComponent);

    this.layout.init();
  }

  registerComponent<T>(
    componentName: string,
    entryComponent: NgComponent<T>
  ): void {
    let self = this;

    let regComponent = function (container: GoldenLayout.Container) {
      let component: ComponentRef<T>;

      //create angular component in angular zone and append it in to layout container
      self.zone.run((_) => {
        component = self.createComponent(entryComponent, container);
        const view: HTMLElement = (component.hostView as any).rootNodes[0];
        container.getElement().append(view);
      });

      //destroy angular component
      container.on('destroy', () => {
        self.zone.run((_) => {
          self.destroyComponent(component);
        });
      });
    };

    this.layout.registerComponent(componentName, regComponent.bind(self));
  }

  createComponent<T>(
    entryComponent: NgComponent<T>,
    container: GoldenLayout.Container
  ): ComponentRef<T> {
    const factory =
      this.componentFactoryResolver.resolveComponentFactory<T>(entryComponent);

    //inject container to component; we can get this value in component constructor
    const injector = Injector.create(
      [
        { provide: 'Container', useValue: container },
        { provide: 'GoldenLayout', useValue: this.layout },
      ],
      this.injector
    );

    const component = factory.create(injector);
    this.appRef.attachView(component.hostView);

    return component;
  }

  destroyComponent(component: ComponentRef<any>): void {
    this.appRef.detachView(component.hostView);
    component.destroy();
  }
}
