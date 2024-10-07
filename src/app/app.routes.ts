import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RandomuserComponent } from './components/randomuser/randomuser.component';
import { authGuard } from './guards/auth/auth.guard';
import { EdituserComponent } from './components/edituser/edituser.component';

export const routes: Routes = [
    {
        path: "",
        component: LoginComponent
    },
    {
        path: "usuarios",
        children: [
            {
                path: "",
                component: RandomuserComponent
            }, {
                path: "editar/:id",
                component: EdituserComponent,
            }],
        canActivate: [authGuard]
    },
];
