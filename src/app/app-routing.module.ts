import { AuthGuard } from './guards/auth.guard';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { CaixaDeEntradaComponent } from './modules/caixa-de-entrada/caixa-de-entrada.component';
import { CadastroComponent } from './modules/cadastro/cadastro.component';
import { UsersComponent } from './modules/user/user.component';


// const rotas: Routes = [
//   {path: '', component: LoginComponent},
//   {path: 'inbox', component: CaixaDeEntradaComponent },
//   {path: 'cadastro', component: CadastroComponent},
//   {path: 'users', component: UserComponent},

//   ]

const rotas: Routes = [
/*   {
    path: 'editproject',
    loadChildren: () => import('./modules/edit-project/edit-project.module').then(m => m.EditProjectModule)
  }, */
  {
    path: 'cadastro',
    loadChildren: () => import('./modules/cadastro/cadastro.module').then(m => m.CadastroModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'edit-user',
    loadChildren: () => import('./modules/edit-user/edit-user.module').then(m => m.EditUserModule)
  },
  {
    path: 'inbox',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./modules/caixa-de-entrada/caixa-de-entrada.module').then(m => m.CaixaDeEntradaModule)
  },
  {
    path: 'users',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'projects',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./modules/project/project.module').then(m => m.ProjectModule)
  },
  {
    path: 'dashboard',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },

  // {
  //   path: '**',
  //   component: PaginaNaoEncontradaComponent
  // }

  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(rotas)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
