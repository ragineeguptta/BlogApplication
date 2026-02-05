import { Routes } from '@angular/router';
import { CategoryList } from './feature/category/category-list/category-list';
import { AddCategory } from './feature/category/add-category/add-category';
import { EditCategory } from './feature/category/edit-category/edit-category';
import { BlogpostList } from './feature/blogpost/blogpost-list/blogpost-list';
import { AddBlogpost } from './feature/blogpost/add-blogpost/add-blogpost';
import { EditBlogpost } from './feature/blogpost/edit-blogpost/edit-blogpost';
import { Home } from './feature/public/home/home';
import { BlogDetails } from './feature/public/blog-details/blog-details';
import { Login } from './feature/auth/login/login';
import { adminGuard } from './feature/auth/guards/admin-guard';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'blog/:url',
        component: BlogDetails
    },
    {
        path: 'admin/category',
        component: CategoryList,
        canActivate: [adminGuard]
    },
    {
        path: 'admin/category/add',
        component: AddCategory,
        canActivate: [adminGuard]
    },
    {
        path: 'admin/category/edit/:id',
        component: EditCategory,
        canActivate: [adminGuard]
    },
    {
        path: 'admin/blogposts',
        component: BlogpostList,
        canActivate: [adminGuard]
    },
    {
        path: 'admin/blogposts/add',
        component: AddBlogpost,
        canActivate: [adminGuard]
    },
    {
        path: 'admin/blogposts/edit/:id',
        component: EditBlogpost,
        canActivate: [adminGuard]
    },
];
