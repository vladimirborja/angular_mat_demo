import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html', 
  styleUrls: ['./register.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatIconModule,
    MatSlideToggleModule
  ],
})
export class RegisterComponent {
  submitted = false;
  minSkillLevel = 1;
  maxSkillLevel = 10;
  isDarkMode = false;

  angularTopics: string[] = [
    'Components & Templates',
    'Services & Dependency Injection',
    'Directives',
    'Routing & Navigation',
    'Reactive Forms',
    'State Management (NgRx)',
    'Angular Material',
    'Testing & Debugging',
    'Performance Optimization',
  ];

  formData: FormGroup = new FormGroup({
    userName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required, 
      Validators.minLength(8), 
      Validators.pattern(/^[A-Za-z][A-Za-z0-9]*$/)
    ]),
    gender: new FormControl('', Validators.required),
    birthDate: new FormControl(null, [Validators.required, this.birthDateValidator]),
    address: new FormControl(''),
    angularSkillLevel: new FormControl(5, Validators.required)
  });

  toggleTheme(isDark: boolean) {
    this.isDarkMode = isDark;
    const body = document.body;
    if (this.isDarkMode) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  }

  onClickSubmit() {
    this.submitted = true;
    if (this.formData.valid) {
      console.log("Form Submitted Successfully!", this.formData.value);
    } else {
      console.log("Form is not valid!");
    }
  }

  birthDateValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null; 
    const birthYear = new Date(control.value).getFullYear();
    return birthYear <= 2006 ? null : { invalidBirthYear: true };
  }
}
