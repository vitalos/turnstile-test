import { Routes } from '@angular/router';
import { Form } from './form/form';
import { Success } from './success/success';
import { App } from './app';

export const routes: Routes = [
    { path: '', component: Form },
    { path: 'success', component: Success }
];
