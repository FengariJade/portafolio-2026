import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthStore } from '@stores/auth.store';

@Component({
  selector: 'menu-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './menu-header.component.html',
  styles: ``,
})
export class MenuHeaderComponent {
  authStore = inject(AuthStore);

  listScreens: any[] = [];

  private resetOnSuccessEffect = effect(() => {
    const screens = this.authStore.screens();
    const screen = this.authStore.screenSelected();

    // Manejo de errores
    if (screen) {
      const listScreens =
        screens?.find((s) => s.id == screen.parentId)?.items ?? [];
        if(listScreens.length <= 4){
          this.listScreens=listScreens
        }else{
          this.listScreens=[]
        }
    }else{
          this.listScreens=[]
    }

  });
  
}
