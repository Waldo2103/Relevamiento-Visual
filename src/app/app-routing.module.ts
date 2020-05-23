import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './Componentes/login/login.module#LoginPageModule' },
  { path: 'cosas-lindas', loadChildren: './Componentes/cosas-lindas/cosas-lindas.module#CosasLindasPageModule' },
  { path: 'cosas-feas', loadChildren: './Componentes/cosas-feas/cosas-feas.module#CosasFeasPageModule' },
  { path: 'cosas-feas', loadChildren: './Componentes/cosas-feas/cosas-feas.module#CosasFeasPageModule' }
  //{ path: 'image-modal', loadChildren: './Componentes/image-modal/image-modal.module#ImageModalPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
