import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
//import { ProjectFormComponent } from './modules/project-form/project-form.component';

//import { ProjectComponent } from './project/project.component';
//import { EditProjectComponent } from './edit-project/edit-project.component';



@NgModule({
  declarations: [
    AppComponent,
    //ProjectFormComponent,
    //ProjectFormComponent,
    //ProjectComponent,
     // EditProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
