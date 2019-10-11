import {HttpClient} from "@angular/common/http";
import {EMPTY} from "rxjs";

import { CreatePageComponent } from "./create-page.component";
import {PostService} from "../../shared/post.service";
import {AlertService} from "../shared/services/alert.service";
import {Post} from "../../shared/interfaces";

describe('test CreatePageComponent', () => {
  let component: CreatePageComponent;
  const postService = new PostService(new HttpClient(null));
  const alertService = new AlertService();

  beforeEach(() => {
    component = new CreatePageComponent(postService, alertService);
    component.ngOnInit();
  });

  it('should create form with 3 controls', () => {
    expect(component.form.contains('title')).toBeTruthy();
    expect(component.form.contains('text')).toBeTruthy();
    expect(component.form.contains('author')).toBeTruthy();
  });

  it('should mark controls as invalid if empty value', () => {
    const titleControl = component.form.get('title');
    const textControl = component.form.get('text');
    const authorControl = component.form.get('author');

    titleControl.setValue('');
    textControl.setValue('');
    authorControl.setValue('');

    expect(titleControl.valid).toBeFalsy();
    expect(textControl.valid).toBeFalsy();
    expect(authorControl.valid).toBeFalsy();
  });

  it('should submit form', () => {
    const spy = spyOn(postService, 'create').and.returnValue(EMPTY);

    const titleControl = component.form.get('title');
    const textControl = component.form.get('text');
    const authorControl = component.form.get('author');

    titleControl.setValue('title');
    textControl.setValue('text');
    authorControl.setValue('author');

    const post: Post = {
      title: component.form.value.title,
      author: component.form.value.author,
      text: component.form.value.text,
      date: new Date()
    };

    component.submit();

    expect(spy).toHaveBeenCalledWith(post);
  });
});
