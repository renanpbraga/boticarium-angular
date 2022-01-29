import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GardenComponent } from './components/garden/garden.component';
import { LaboratoryComponent } from './components/laboratory/laboratory.component';
import { LibraryComponent } from './components/library/library.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'laboratorio',
    component: LaboratoryComponent,
  },
  {
    path: 'jardim',
    component: GardenComponent,
  },
  {
    path: 'biblioteca',
    component: LibraryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
