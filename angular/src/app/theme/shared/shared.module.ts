// Angular Import
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// project import
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { CardComponent } from './components/card/card.component';
import { DataFilterPipe } from './filter/data-filter.pipe';
import { SpinnerComponent } from './components/spinner/spinner.component';

// third party
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgClickOutsideDirective } from 'ng-click-outside2';
import 'hammerjs';
import 'mousetrap';

// bootstrap import
import { NgbDropdownModule, NgbNavModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './components/services/auth/auth.service';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardComponent,
    BreadcrumbComponent,
    NgbDropdownModule,
    NgbNavModule,
    NgbModule,
    NgScrollbarModule,
    NgClickOutsideDirective,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatNativeDateModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatTooltipModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    ToastrModule.forRoot()
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardComponent,
    BreadcrumbComponent,
    DataFilterPipe,
    SpinnerComponent,
    NgbModule,
    NgbDropdownModule,
    NgbNavModule,
    NgScrollbarModule,
    NgClickOutsideDirective,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatNativeDateModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatTooltipModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    ToastrModule
  ],
  declarations: [DataFilterPipe, SpinnerComponent],
  providers: [AuthService]
})
export class SharedModule {}
