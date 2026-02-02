import { Routes } from '@angular/router';
import { CategoryList } from './feature/category/category-list/category-list';
import { AddCategory } from './feature/category/add-category/add-category';
import { EditCategory } from './feature/category/edit-category/edit-category';
import { BlogpostList } from './feature/blogpost/blogpost-list/blogpost-list';
import { AddBlogpost } from './feature/blogpost/add-blogpost/add-blogpost';

export const routes: Routes = [
    {
        path: 'admin/category',
        component: CategoryList
    },
    {
        path: 'admin/category/add',
        component: AddCategory
    },
    {
        path: 'admin/category/edit/:id',
        component: EditCategory
    },
    {
        path: 'admin/blogposts',
        component: BlogpostList
    },
    {
        path: 'admin/blogposts/add',
        component: AddBlogpost
    }
];
