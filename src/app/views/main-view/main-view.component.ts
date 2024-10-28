import {
  Component,
  OnInit,
  AfterViewInit,
  Inject,
  ChangeDetectorRef,
  ViewEncapsulation,
} from '@angular/core';
import { Container } from 'golden-layout';
import GoldenLayout from 'golden-layout';
import { SharedService } from './../../shared.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class MainViewComponent implements OnInit, AfterViewInit {
  svgBgColorSelect: FormControl = new FormControl();
  svgBgColorSelected = 'white';

  constructor(
    //inject parent container
    @Inject('Container') public container: Container,
    @Inject('GoldenLayout') public layout: GoldenLayout,
    private detector: ChangeDetectorRef,
    public service: SharedService
  ) {
    this.svgBgColorSelect.valueChanges.subscribe(
      (value) => (this.svgBgColorSelected = value)
    );
  }

  get width() {
    return this.container.width;
  }
  get height() {
    return this.container.height;
  }
  set width(val: number) {
    this.container.setSize(val, this.height);
  }
  set height(val: number) {
    this.container.setSize(this.width, val);
  }

  ngAfterViewInit() {
    this.svgBgColorSelect.setValue('');
  }

  ngOnInit() {
    //here we can change container state
    this.container.setTitle('MainView Title');

    this.container.on('resize', (_) => {
      //we need to tell angular that something was changed
      this.detector.detectChanges();
    });

    console.log('main view initialized');
  }
  ngOnDestroy(): void {
    console.log('main view destroyed');
  }
}
