import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: 'product-list', component: ProductListComponent },
  // { path: 'add-edit-product', component: AddEditProductComponent },
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./product-list/product-list.component')
      },
      {
        path: '',
        loadComponent: () => import('./add-edit-product/add-edit-product.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {}
