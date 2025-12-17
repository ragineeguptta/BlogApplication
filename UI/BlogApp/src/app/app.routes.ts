import { Routes } from '@angular/router';
import { CategoryList } from './feature/category/category-list/category-list';
import { AddCategory } from './feature/category/add-category/add-category';

export const routes: Routes = [
    {
        path: 'admin/category',
        component: CategoryList
    },
    {
        path: 'admin/category/add',
        component: AddCategory
    }
];
