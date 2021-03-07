import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//import { ProjectRoutingModule } from '../project/project-routing.module';
import { DashboardService } from 'src/app/services/dashboard.service';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AssistFormModule } from '../../components/assist-form.module';
import { SharedComponentsModule } from '../../components/shared-components.module';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedComponentsModule,
    AssistFormModule,
    DashboardRoutingModule
  ],
  providers: [DashboardService]
})
export class DashboardModule { }
