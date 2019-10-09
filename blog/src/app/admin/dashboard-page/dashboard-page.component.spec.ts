import {EMPTY, of, Subscription} from "rxjs";

import { DashboardPageComponent } from "./dashboard-page.component";
import { PostService } from "../../shared/post.service";
import { AlertService } from "../shared/services/alert.service";

describe('test DashboardPageComponent', () => {
  let component: DashboardPageComponent;
  let postService: PostService;
  let alertService: AlertService;

  beforeEach(() => {
    postService = new PostService(null);
    alertService = new AlertService();
    component = new DashboardPageComponent(postService, alertService);
  });

  it('should call getAllPosts on ngOnInit', () => {
    const spy = spyOn(postService, 'getAllPosts').and.callFake(() => {
      return EMPTY;
    });

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  it('should update post array correctly', () => {
    const posts = [{
      title: 'Title',
      id: '1',
      text: 'sss',
      author: 'A',
      date: new Date()
    }];
    spyOn(postService, 'getAllPosts').and.returnValue(of(posts));

    component.ngOnInit();

    expect(component.posts.length).toBe(posts.length);
  });

    it('should remove post and call alertService.success', () => {
      component.posts = [{
        title: 'Title',
        id: '1',
        text: 'sss',
        author: 'A',
        date: new Date()
      }];
      const spy = spyOn(postService, 'remove').and.returnValue(EMPTY);

      const id = component.posts[0].id;

      component.remove(id);

      expect(spy).toHaveBeenCalledWith(id);
    });

    it('should unsubscribe when ngOnDestroy is called', () => {
      component.postsSubscription = new Subscription();
      component.deleteSubscription = new Subscription();

      const postSpy =spyOn(component.postsSubscription, 'unsubscribe');
      const deleteSpy =spyOn(component.deleteSubscription, 'unsubscribe');

      component.ngOnDestroy();

      expect(postSpy).toHaveBeenCalled();
      expect(deleteSpy).toHaveBeenCalled();
    });
  });
