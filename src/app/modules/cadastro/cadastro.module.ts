import { CadastroRoutingModule } from './cadastro-routing.module';
import { AssistFormModule } from './../../components/assist-form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastroComponent } from './cadastro.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedComponentsModule } from '../../components/shared-components.module';
import { UserService } from 'src/app/services/user.service';

@NgModule({
  declarations: [
    CadastroComponent
  ],
  imports: [
    CommonModule,
    // FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedComponentsModule,
    AssistFormModule,
    CadastroRoutingModule
  ],
  providers: [UserService]

})
export class CadastroModule { }
