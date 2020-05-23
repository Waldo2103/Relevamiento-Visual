import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ModalService } from '../servicios/modal.service';
//import { timeout } from 'rxjs/operators';
import { timer } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  show = false;
  constructor(public router: Router,
    private modalService: ModalService
  ){  }

  openModal(id: string) {
    this.modalService.open(id);
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }
  Lindas(){
    this.show = true;
    timer(2000).subscribe(() => this.router.navigate(['/cosas-lindas']));
  }
  Feas(){
    this.show = true;
    timer(2000).subscribe(() => this.router.navigate(['/cosas-feas']));  
  }
}
