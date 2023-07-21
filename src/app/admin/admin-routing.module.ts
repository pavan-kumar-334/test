import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthGuard } from '../shared/auth.guard';
import { AddListComponent } from '../add-list/add-list.component';

const routes: Routes = [
  { path: '', component: LoginComponent },

  {
    path: 'Home',

    children: [
      {
        path: '',
        component: DashboardComponent,
      },

      {
        path: 'add',
        component: AddListComponent,
      },

      {
        path: 'Edit/:id/:name',
        component: AddListComponent,
      },
    ],

    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
