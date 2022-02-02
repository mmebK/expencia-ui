import {Routes} from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';

import {UserProfileComponent} from './user-profile/user-profile.component';
import {TablesComponent} from './tables/tables.component';
import {AuthenticationGuard} from "../../guards/authentication.guard";

export const AdminLayoutRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthenticationGuard],
    runGuardsAndResolvers: 'always'
  },
  {path: 'user-profile', component: UserProfileComponent, canActivate: [AuthenticationGuard]},
  {path: 'tables', component: TablesComponent, canActivate: [AuthenticationGuard]},


];
