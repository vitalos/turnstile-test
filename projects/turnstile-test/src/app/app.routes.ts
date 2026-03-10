import { Routes } from '@angular/router';
import { Form } from './form/form';
import { Success } from './success/success';

export const routes: Routes = [
    { path: '/turnstile-test/', component: Form },
    { path: '/turnstile-test/success', component: Success }
];
