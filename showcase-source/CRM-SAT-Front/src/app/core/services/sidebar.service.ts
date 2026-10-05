import { Injectable } from '@angular/core';
import { MenuOption } from '@interfaces/menu-option.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

 
  private expanded$ = new BehaviorSubject<boolean>(false);

  setExpanded(value: boolean) {
    this.expanded$.next(value);
  }

  isExpanded$() {
    return this.expanded$.asObservable();
  }

  isExpanded() {
    return this.expanded$.value;
  }

  
  private _activeOption = new BehaviorSubject<MenuOption | null>(null);
  activeOption$ = this._activeOption.asObservable();

  setActive(option: MenuOption) {
    this._activeOption.next(option);
  }

  get activeOption() {
    return this._activeOption.value;
  }
  
}
