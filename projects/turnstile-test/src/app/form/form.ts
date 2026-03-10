import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxTurnstileFormsModule, NgxTurnstileModule } from 'ngx-turnstile';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, NgxTurnstileModule, NgxTurnstileFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {
  fb: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);

  form = this.fb.group({
    turnstile: [null, [], [this.validateResponse.bind(this)]],
  });

  async validateResponse(control: FormControl<string | null>) {
    const response = control.value;
    
    if (!response) {
      return { required: true };
    }

    try {
      const verificationResponse = await fetch('http://localhost:3000/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ response })
      });

      if (!verificationResponse.ok) {
        return { serverError: true };
      }

      const result = await verificationResponse.json();
      return result.success ? null : { invalidResponse: true };
    } catch (error) {
      console.error('Error validating response:', error);
      return { serverError: true };
    }
  }

  moveOn() {
    this.router.navigate(['/success']);
  }
}
