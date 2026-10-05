import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/components/login/login')
        .then(m => m.Login),
  },
  {
    path: 'track/:code',
    loadComponent: () =>
      import('./features/TrackingPage/components/tracking-public-page/tracking-public-page')
        .then(m => m.TrackingPublicPage), 
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout/layout/layout')
        .then(m => m.Layout),
    canActivate: [authGuard],
    children: [
      /* {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard')
            .then(m => m.Dashboard),
      }, */
      {
        path: 'packages',
        loadComponent: () =>
          import('./features/packages/components/package-form/package-form')
            .then(m => m.PackageForm),
      },
      {
        path: 'trucks',
        loadComponent: () =>
          import('./features/trucks/components/vehicle-list/vehicle-list')
            .then(m => m.VehicleList),
      },
      {
        path: 'drivers',
        loadComponent: () =>
          import('./features/drivers/components/driver-list/driver-list')
            .then(m => m.DriverList),
      },
      {
        path: 'deliveries',
        loadComponent: () =>
          import('./features/deliveries/components/delivery-list/delivery-list')
            .then(m => m.DeliveryList),
      },
      {
        path: 'routes',
        loadComponent: () =>
          import('./features/routes/components/route-list/route-list')
            .then(m => m.RouteList),
      },
      {
        path: 'warehouses',
        loadComponent: () =>
          import('./features/warehouses/components/warehouse-list/warehouse-list')
            .then(m => m.WarehouseList),
      },
      { path: 'manifests', 
        loadComponent: () => 
          import('./features/manifests/components/manifest-list/manifest-list')
        .then(m => m.ManifestList) 
      },
      {
        path: 'warehouse-unload',
        loadComponent: () =>
          import('./features/warehouse-unload/components/unload-dashboard/unload-dashboard')
            .then(m => m.UnloadDashboard),
      },
      /* {
        path: 'tracking',
        loadComponent: () =>
          import('./features/tracking/components/live-map/live-map')
            .then(m => m.LiveMap),
      },
      {
        path: 'tracking/:id',
        loadComponent: () =>
          import('./features/tracking/components/tracking-page/tracking-page')
            .then(m => m.TrackingPage),
      }, */
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/settings/components/settings-layout/settings-layout')
            .then(m => m.SettingsLayout),
        children: [
          {
            path: 'users',
            loadComponent: () =>
              import('./features/settings/components/users/user-list/user-list')
                .then(m => m.UserList),
          },
          {
            path: 'permissions',
            loadComponent: () =>
              import('./features/settings/components/permissions/permission-matrix/permission-matrix')
                .then(m => m.PermissionMatrix),
          },
          {
            path: '',
            redirectTo: 'users',
            pathMatch: 'full',
          },
        ]
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
