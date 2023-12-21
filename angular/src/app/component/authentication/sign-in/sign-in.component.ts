import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/theme/shared/components/services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export default class SignInComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.intializeForm();
  }

  intializeForm() {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  submit() {
    if (this.loginForm.invalid) {
      return;
    }
    let payload = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    };
    this.authService.login(payload).subscribe((data) => {
      console.log('data', data);
      this.router.navigate(['/dashboard']);
    });
  }
}
