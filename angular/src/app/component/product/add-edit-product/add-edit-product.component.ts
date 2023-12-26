import { CommonModule } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ProductSaleComponent } from '../../dashboard/dash-analytics/product-sale/product-sale.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/theme/shared/components/services/product/product.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule]
})
export default class AddEditProductComponent implements OnInit {
  selectedImage: any = null;
  @Input() productData: any;
  productForm!: FormGroup;
  productImage: File | null = null;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEditProductComponent>,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data) this.selectedImage = `http://localhost:3000/uploads/${this.data.imageUrl}`;
    this.intializeForm();
  }

  intializeForm() {
    this.productForm = this.fb.group({
      name: new FormControl(this.data?.name ? this.data?.name : '', [Validators.required]),
      price: new FormControl(this.data?.price ? this.data?.price : '', [Validators.required]),
      description: new FormControl(this.data?.description ? this.data?.description : '', [Validators.required]),
      image: new FormControl(this.data?.imageUrl ? this.data?.imageUrl : '', [Validators.required])
    });
  }

  onFileSelected(event: any) {
    this.productImage = event.target.files?.[0];
  }

  addProduct() {
    const formData = new FormData();
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    formData.append('name', this.productForm.controls['name'].value);
    formData.append('price', this.productForm.controls['price'].value);
    if (this.productImage) {
      formData.append('imageUrl', this.productImage, this.productImage.name);
    }
    formData.append('description', this.productForm.controls['description'].value);

    this.productService.addProduct(formData).subscribe((product) => {
      this.dialogRef.close();
    });
  }

updateProduct() {
  const formData = new FormData();
  formData.append('name', this.productForm.controls['name'].value);
  formData.append('price', this.productForm.controls['price'].value);
  formData.append('description', this.productForm.controls['description'].value);

  if (this.productImage) {
    formData.append('imageUrl', this.productImage, this.productImage.name);
  } else {
    formData.append('imageUrl', this.productForm.controls['image'].value); // You might want to use the existing image URL here
  }


  console.log('FormData:', formData);

 

  this.productService.updateProduct(this.data._id, formData).subscribe(
    (product) => {      
      this.dialogRef.close();
    },
    (error) => {      
      console.error('Error updating product:', error);
    }
  );
}
  closePopup() {
    this.dialogRef.close();
  }
}
