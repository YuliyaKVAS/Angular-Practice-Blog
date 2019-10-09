import { TestBed } from '@angular/core/testing'
import { Router } from '@angular/router';
import { RouterTestingModule } from "@angular/router/testing";

import { AdminModule } from "../../../admin.module";
import { AuthService } from '../../services/auth.service';
import { AdminLayoutComponent } from "./admin-layout.component";

describe('test AdminLayoutComponent', () => {
  let component: AdminLayoutComponent;
  let router: Router;
  let auth: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AdminModule,
        RouterTestingModule.withRoutes([]),
      ],
    }).compileComponents();
    auth = new AuthService(null);
    router = TestBed.get(Router);
    component = new AdminLayoutComponent(router, auth);
  });

  it('test logout method', () => {
    const event = new MouseEvent('click');
    spyOn(event, 'preventDefault');
    spyOn(auth, 'logout');
    spyOn(router, 'navigate');

    component.logout(event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(auth.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/admin', 'login']);
  });
});
