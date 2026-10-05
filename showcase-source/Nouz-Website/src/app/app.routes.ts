import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: '',
        loadComponent: () =>
        import('./features/home/home').then(m => m.Home),
    },
    {
        path: 'profile',
        loadComponent: () =>
        import('./features/profile/profile').then(m => m.Profile)
    },
    /*
    {
        path: 'profile',
        loadComponent: () =>
            import('./features/profile/profile.component')
            .then(m => m.ProfileComponent),
        canActivate: [AuthGuard],
    }
    */

];
