// Angular Import
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// project import
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./component/dashboard/dash-analytics/dash-analytics.component')
      },
      {
        path: 'component',
        loadChildren: () => import('./component/ui-element/ui-basic.module').then((m) => m.UiBasicModule)
      },
      {
        path: 'chart',
        loadComponent: () => import('./component/chart & map/core-apex/core-apex.component')
      },
      {
        path: 'forms',
        loadComponent: () => import('./component/forms & tables/form-elements/form-elements.component')
      },
      {
        path: 'tables',
        loadComponent: () => import('./component/forms & tables/tbl-bootstrap/tbl-bootstrap.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./component/sample-page/sample-page.component')
      },
      {
        path: 'product',
        loadChildren: () => import('./../app/component/product/product.module').then((m) => m.ProductModule)
      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'auth/signup',
        loadComponent: () => import('./component/authentication/sign-up/sign-up.component')
      },
      {
        path: 'auth/signin',
        loadComponent: () => import('./component/authentication/sign-in/sign-in.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
