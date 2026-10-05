import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuOptionItem } from '@interfaces/menu-option.interface';
import { Screen } from '@models/screen.model';
import { AuthStore } from '@stores/auth.store';

@Component({
  selector: 'parent-menu',
  imports: [CommonModule, RouterModule],
  templateUrl: './parent-menu.component.html',
  styles: ``,
})
export class ParentMenuComponent {
  
  authStore = inject(AuthStore);

  listScreens: any[] = [];

  private resetOnSuccessEffect = effect(() => {
    const screens = this.authStore.screens();
    const screen:any = this.authStore.screenSelected();

    // Manejo de errores
    if (screen?.parentId) {
      this.listScreens =
        screens?.find((s) => s.id == screen.parentId)?.items ?? [];
    }else if(screen?.children && screen?.children?.length != 0){
      this.listScreens = screen?.children.map((item:Screen)=>({id:item.id,label:item.name,link:item.path,icon:item.icon,description:item.description}as MenuOptionItem
      ))
    }
  });



}
