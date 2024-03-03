export declare type I_RequestResult<T> = {
  code: number
  message: string | null
  data: T
}

export interface I_RequestOptions extends UniNamespace.RequestOptions {
  hideLoading?: boolean
}
