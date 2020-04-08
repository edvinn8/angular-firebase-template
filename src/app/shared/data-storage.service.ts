import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, take } from 'rxjs/operators'
import { settings } from '../shared/config'
import { throwError, Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  private DATABASE_URL = settings.apiConfig.databaseURL

  constructor(private http: HttpClient) {}

  getItem(subUrl: string, itemDatabaseId: string): Observable<any> {
    return this.http.get(`${this.DATABASE_URL}/${subUrl}/${itemDatabaseId}.json`).pipe(
      take(1),
      map((items) => {
        return Object.entries(items)
          .map((item) => {
            return {
              ...item[1],
              databaseId: item[0]
            }
          })
          .pop()
      })
    )
  }

  insertItem(subUrl: string, item: any) {
    return this.http.post<{ name: string }>(`${this.DATABASE_URL}/${subUrl}.json`, item).pipe(
      take(1),
      map((res) => {
        return {
          ...item,
          databaseId: res.name
        }
      })
    )
  }

  updateItem(subUrl: string, item: any) {
    if (!item.databaseId) {
      return throwError('Missing databaseId on the updated property')
    }
    return this.http
      .put<any[]>(`${this.DATABASE_URL}/${subUrl}/${item.databaseId}/.json`, item)
      .pipe(take(1))
  }

  deleteItem(subUrl: string, item: any) {
    if (!item.databaseId) {
      return throwError('Missing databaseId on the updated property')
    }
    return this.http
      .delete<any[]>(`${this.DATABASE_URL}/${subUrl}/${item.databaseId}.json`)
      .pipe(take(1))
  }

  getItems(subUrl: string) {
    return this.http.get<any[]>(`${this.DATABASE_URL}/${subUrl}.json`).pipe(
      take(1),
      map((items) => {
        return Object.entries(items).map((item) => {
          return {
            ...item[1],
            databaseId: item[0]
          }
        })
      })
    )
  }
}
