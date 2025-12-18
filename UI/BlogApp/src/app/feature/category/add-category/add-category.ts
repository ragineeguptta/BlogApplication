import { Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AddCategoryRequest } from '../model/category.model';
import {CategoryService} from '../services/category-service';

@Component({
  selector: 'app-add-category',
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css',
})
export class AddCategory {

  constructor(){
    
  effect(() => {
    if (this.categoryService.addCategoryStatus() === 'success') {
      console.error('Add Category Request Success');
    }
    if (this.categoryService.addCategoryStatus() === 'error') {
      console.error('Add Category Request Failed');
    }
  });
  }

private categoryService = inject(CategoryService);

  addCategoryFormGroup = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true, 
      validators : [Validators.required, Validators.maxLength(100)]
    }),
    urlHandle: new FormControl<string>('', {
      nonNullable: true,
      validators : [Validators.required, Validators.maxLength(200)]
    }),
  });

  get nameFormControl(){
    return this.addCategoryFormGroup.controls.name;
  }
  get urlHandleFormControl(){
    return this.addCategoryFormGroup.controls.urlHandle;
  }

onSubmit(){
  const addCategoryFormValue = this.addCategoryFormGroup.getRawValue();

  const AddCategoryRequestDto: AddCategoryRequest = {
    name: addCategoryFormValue.name,
    urlHandle: addCategoryFormValue.urlHandle,
  };

  this.categoryService.addCategory(AddCategoryRequestDto);

}

}
