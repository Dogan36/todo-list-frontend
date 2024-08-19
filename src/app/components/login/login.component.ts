import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {

  }
  username: string = ''
  password: string = ''
  token: string = '';
  async onSubmit() {
    try {
      let resp = await this.authService.loginWithUsernameAndPassword(this.username, this.password) as any
      let token = resp.token
      console.log(token)
      localStorage.setItem('token', token)
      this.router.navigateByUrl('/todos')
    }
    catch (e) {
      alert('Login fehlgeschlagen')
      console.error(e)
    }
  }


}
