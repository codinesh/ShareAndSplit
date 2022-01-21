export interface IProductHistory {
  CurrentPrice: number
  Notified: boolean
  PreviousPrice?: number
  UpdatedOn: Date
}

export default interface IProduct {
  Id: string
  Title: string
  Category: string
  Url: string
  TriggerPrice: number
  Price: number
  AddedOn: Date
  ModifiedOn: Date
  IsActive: boolean
  History: IProductHistory[]
  ImageUrl: string
}
