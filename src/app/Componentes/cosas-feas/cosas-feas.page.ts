import { Component, OnInit } from '@angular/core';
import { FotosService } from '../../servicios/fotos.service';

@Component({
  selector: 'app-cosas-feas',
  templateUrl: './cosas-feas.page.html',
  styleUrls: ['./cosas-feas.page.scss'],
})
export class CosasFeasPage implements OnInit {

  constructor(
    private _fotoServ: FotosService
  ) { }

  ngOnInit() {
  }

}
