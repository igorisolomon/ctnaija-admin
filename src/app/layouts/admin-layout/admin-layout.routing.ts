import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { PostsComponent } from 'app/posts/posts.component';
import { CommentsComponent } from 'app/comments/comments.component';
import { PostComponent } from 'app/posts/post/post.component';
import { AuthGuard } from 'app/shared/guards/auth.guard';

export const AdminLayoutRoutes: Routes = [
    { 
        path: 'dashboard', 
        component: DashboardComponent,
        canActivate: [AuthGuard] 
    },
    { 
        path: 'company', 
        component: UserProfileComponent,
        canActivate: [AuthGuard]
    },
    { 
        path: 'categories', 
        component: TableListComponent,
        canActivate: [AuthGuard]
    },
    { 
        path: 'posts', 
        component: PostsComponent,
        canActivate: [AuthGuard] 
    },
    { 
        path: 'comments', 
        component: CommentsComponent,
        canActivate: [AuthGuard]
    },
    { 
        path: 'post', 
        component: PostComponent,
        canActivate: [AuthGuard]
    },
];
