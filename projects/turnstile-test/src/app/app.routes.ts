import { Routes } from '@angular/router';
import { Form } from './form/form';
import { Success } from './success/success';

export const routes: Routes = [
    { path: '', component: Form },
    { path: 'success', component: Success }
];
