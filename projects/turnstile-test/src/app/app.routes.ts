import { Routes } from '@angular/router';
import { Form } from './form/form';
import { Success } from './success/success';
import { App } from './app';

export const routes: Routes = [
    { path: '', component: App },
    { path: '/form', component: Form },
    { path: '/success', component: Success },
    { path: '**', redirectTo: '/form' }
];
