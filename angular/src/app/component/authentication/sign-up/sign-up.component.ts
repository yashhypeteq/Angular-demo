import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/theme/shared/components/services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export default class SignUpComponent implements OnInit {
  signupForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.intializeForm();
  }

  intializeForm() {
    this.signupForm = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  submit() {
    if (this.signupForm.invalid) {
      return;
    }
    let payload = {
      firstName: this.signupForm.controls['firstName'].value,
      lastName: this.signupForm.controls['lastName'].value,
      email: this.signupForm.controls['email'].value,
      phone: this.signupForm.controls['phone'].value,
      password: this.signupForm.controls['password'].value
    };
    this.authService.signup(payload).subscribe((data) => {
      console.log('register data', data);
      this.router.navigate(['/auth/signin']);
    });
  }
}
