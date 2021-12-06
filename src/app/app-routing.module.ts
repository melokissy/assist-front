import { AuthGuard } from './guards/auth.guard';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { CadastroComponent } from './modules/cadastro/cadastro.component';
import { UsersComponent } from './modules/user/user.component';


const rotas: Routes = [

  {
    path: 'cadastro',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/cadastro/cadastro.module').then(m => m.CadastroModule),
    data: { roles: ['Administrador','Tecnico'] }
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
    data: { roles: ['Administrador','Tecnico'] }
  },
  {
    path: 'projects',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/project/project.module').then(m => m.ProjectModule),
    data: { roles: ['Administrador','Tecnico'] }
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    data: { roles: ['Administrador','Tecnico'] }
  },
  {
    path: 'projectForm',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/project-form/project-form.module').then(m => m.ProjectFormModule),
    data: { roles: ['Administrador','Tecnico'] }

  },
  {
    path: 'relatorios',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/relatorio/relatorio.module').then(m => m.RelatorioModule),
    data: { roles: ['Administrador','Tecnico'] }
  },
  {
    path: 'relatorios/usuarios',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/relatorio-usuario/relatorio-usuario.module').then(m => m.RelatorioUsuarioModule),
    data: { roles: ['Administrador','Tecnico'] }
  },
  {
    path: 'tickets',
    loadChildren: () => import('./modules/ticket/ticket.module').then(m => m.TicketModule)  },
  {
    path: 'tickets/ticketInfo',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/ticket/ticket-info/ticket-info.module').then(m => m.TicketInfoModule),
    data: { roles: ['Administrador','Tecnico'] }

  },
  {
    path: 'tickets/cadastro-ticket',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/ticket/cadastro-ticket/cadastro-ticket.module').then(m => m.CadastroTicketModule),
    data: { roles: ['Administrador','Tecnico','Cliente'] }

  },
  {
    path: 'user-settings',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/user-settings/user-settings.module').then(m => m.UserSettingsModule),
    data: { roles: ['Administrador','Tecnico','Cliente'] }
  },
  {
    path: 'tickets/meus-tickets',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/ticket/meus-tickets/meus-tickets.module').then(m => m.MeusTicketsModule),
    data: { roles: ['Administrador','Tecnico','Cliente'] }
  },

  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(rotas),
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
