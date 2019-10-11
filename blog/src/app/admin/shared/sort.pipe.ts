import { Pipe, PipeTransform } from "@angular/core";
import {Post} from "../../shared/interfaces";

@Pipe({
  name: 'sortPosts',
})

export class SortPipe implements PipeTransform{
  transform(posts: Post[], dir = ''): Post[] {
    if(!dir) {
      return posts;
    }

    return [...posts]
      .sort((a, b) => {
        if(dir === 'ASC') {
          return (a['title'].toLowerCase() <= b['title'].toLowerCase() ? -1 : 1);
        }
        return (a['title'].toLowerCase() >= b['title'].toLowerCase() ? -1 : 1);
      });
  }
}
