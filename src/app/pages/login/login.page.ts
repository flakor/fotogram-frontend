import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  @ViewChild('slidePrincipal') slides: IonSlides;



  loginUser = {
    email: 'test1@gmail.com',
    password: '123456'
  };

  registerUser = {
    email: 'test',
    password: '123456',
    nombre: 'Pepe',
    avatar: 'av-1.png'
  };

  constructor( private usuarioService: UsuarioService,
               private navController: NavController,
               private uiService: UiServiceService) { }

  ngOnInit() {
    this.slides.lockSwipes(true);
  }

  async login(fLogin: NgForm) {


    if(fLogin.invalid) { return;}
    console.log(fLogin.valid);
    console.log(this.loginUser);
    const valido = await this.usuarioService.login(this.loginUser.email, this.loginUser.password);
    if (valido) {
      // navegar al tab
      this.navController.navigateRoot('/main/tabs/tab1', { animated: true});
    } else {
      // mostrar alerta
      this.uiService.alertaInfomativa('Usuario y contraseña no son correctos!!!');
    }
  }

  async registro(fRegistro: NgForm) {
    // console.log(fRegistro.valid);
    if (fRegistro.invalid) { return; }
    console.log(this.registerUser);
    const valido = await this.usuarioService.registro(this.registerUser);
    if (valido) {
      // navegar al tab
      this.navController.navigateRoot('/main/tabs/tab1', { animated: true});
    } else {
      // mostrar alerta
      this.uiService.alertaInfomativa(' Ese correo ya existe!!');
    }

  }

 
  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }
  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }
}
