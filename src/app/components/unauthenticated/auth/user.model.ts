import { DatabaseEntry } from 'src/app/shared/database-entry.model'

export class User extends DatabaseEntry {
  public email: string
  public id: string
  public displayName: string
  private _token: string
  private _tokenExpirationDate: Date

  constructor(
    email: string,
    id: string,
    displayName: string,
    _token: string,
    _tokenExpirationDate: Date,
    databaseId?: string
  ) {
    super(databaseId)
    this.email = email
    this.id = id
    this._token = _token
    this._tokenExpirationDate = _tokenExpirationDate
    this.displayName = displayName
  }

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null
    }
    return this._token
  }
}
