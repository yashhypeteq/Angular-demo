import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ProductSaleComponent } from '../../dashboard/dash-analytics/product-sale/product-sale.component';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductService } from 'src/app/theme/shared/components/services/product/product.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import AddEditProductComponent from '../add-edit-product/add-edit-product.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule]
})
export default class ProductListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['select', 'Image', 'name', 'price', 'details', 'Action'];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  productListData: [] = [];
  productData: any;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    this.productService.getProduct().subscribe((data) => {
      this.productListData = data;
      this.dataSource.data = data;
    });
  }

  editProduct(pid: any): void {
    this.productService.getProductById(pid).subscribe((data) => {
      this.productData = data;
      this.openAddEditProductModal();
    });
  }

  openModal(pid?: any): void {
    if (pid) {
      this.editProduct(pid);
    } else {
      this.productData = null;
      this.openAddEditProductModal();
    }
  }

  openAddEditProductModal(): void {
    const dialogRef = this.dialog.open(AddEditProductComponent, {
      width: '400px',
      data: this.productData ? { ...this.productData } : null
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') {
        this.getProduct();
      }
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deleteProduct(id: any) {
    this.productService.deleteProduct(id).subscribe(
      (data: any) => {
        this.getProduct();
        this.toastr.success('Product Deleted Successfully', 'Success');
      },
      (error: any) => {
        this.toastr.error(error, 'Error');
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Position + 1}`;
  }
}
