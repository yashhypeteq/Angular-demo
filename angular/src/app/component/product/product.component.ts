import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule, NgApexchartsModule, RouterModule]
})
export class ProductComponent {}
