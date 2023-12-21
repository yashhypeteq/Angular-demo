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

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEditProductComponent>,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit(): void {
    console.log(' datas', this.data);
    if (this.data) this.selectedImage = `http://localhost:3000/uploads/${this.data.imageUrl}`;
    this.intializeForm();
  }
  intializeForm() {
    this.productForm = this.fb.group({
      name: new FormControl(this.data?.name ? this.data?.name : '', [Validators.required]),
      price: new FormControl(this.data?.price ? this.data?.price : '', [Validators.required]),
      description: new FormControl(this.data?.details ? this.data?.details : '', [Validators.required]),
      image: new FormControl(this.data?.imageUrl ? this.data?.imageUrl : '', [Validators.required])
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    // this.selectedImage = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImage = e.target?.result;
        this.data.imageUrl = this.selectedImage;
        this.productForm.controls['image'].value;
      };
      // reader.readAsDataURL(file);
    }
  }

  addProduct() {
    const imageFile = this.productForm.controls['image'].value.file;

    let payload = {
      name: this.productForm.controls['name'].value,
      price: this.productForm.controls['price'].value,
      image: imageFile,
      description: this.productForm.controls['description'].value
    };

    this.productService.addProduct(payload).subscribe((product) => {
      this.dialogRef.close();
    });
  }

  closePopup() {
    this.dialogRef.close();
  }
}
