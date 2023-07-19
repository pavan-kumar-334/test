import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  responsedata: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthserviceService,
    private route: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Implement login logic here when the form is submitted
  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      this.authService.login(this.loginForm.value).subscribe((result) => {
        if (result != null) {
          this.responsedata = result['accessToken'];
          console.log('ttttttttttttttttt', this.responsedata);
          localStorage.setItem('token', this.responsedata);
          this.route.navigate(['/Home']);
        }
      });
    }
  }

  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();
}
