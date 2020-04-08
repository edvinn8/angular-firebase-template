import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { User } from 'src/app/components/unauthenticated/auth/user.model'
import { DataStorageService } from 'src/app/shared/data-storage.service'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private dts: DataStorageService) {}

  getUser(id: string): Observable<User> {
    return this.dts.getItem(`users`, id)
  }

  insertUser(user: User) {
    return this.dts.insertItem(`users/${user.id}`, user)
  }

  updateUser(user: User) {
    return this.dts.updateItem(`users/${user.id}`, user)
  }

  deleteUser(user: User) {
    this.dts.deleteItem(`tess/${user.id}`, user)
  }
}
