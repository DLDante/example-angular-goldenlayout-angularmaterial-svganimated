import { Component, OnInit, Inject } from '@angular/core';
import { Container } from 'golden-layout';
import { SharedService } from './../../shared.service';

@Component({
  selector: 'app-third-view',
  templateUrl: './third-view.component.html',
})
export class ThirdViewComponent implements OnInit {
  constructor(
    @Inject('Container') public container: Container,
    public service: SharedService
  ) {}

  get tabTitle() {
    return this.container.title;
  }
  set tabTitle(val: string) {
    this.container.setTitle(val);
  }

  ngOnInit() {
    console.log('third view initialized');
  }
  ngOnDestroy() {
    console.log('third view destroyed');
  }
}
