import { symErrorTip } from '@/system-tip/error-tip'
import type { I_RequestOptions, I_RequestResult } from './types'
import operate from './operate'

const httpInterceptor = {
  // 拦截前触发
  invoke(options: I_RequestOptions) {
    if (!options.url.startsWith('http')) {
      options.url = operate.api() + options.url
    }
    options.timeout = 10000
    options.header = {
      ...options.header,
      'source-client': 'miniapp',
    }
    // TODO
    const token = ''
    if (token) {
      options.header.Authorization = token
    }
  },
}
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

export default class Request {
  http<T = any>(params: I_RequestOptions) {
    // 请求参数
    const { url, method, data, header, hideLoading } = params || {}
    //自定义请求头信息
    const basicHeader = {}
    //拼接完整请求地址（根据环境切换）
    const requestUrl = operate.api() + url

    //加载
    if (!hideLoading) {
      uni
        .showLoading({
          title: '加载中...',
        })
        .then((r) => {})
    }
    return new Promise((reslove, reject) => {
      // 请求
      uni.request({
        url: requestUrl,
        data: data,
        method: method,
        header: { ...basicHeader, ...header },
        success: (result) => {
          const res = result.data as I_RequestResult<T>
          uni.hideLoading()
          if (result.statusCode && result.statusCode !== 200) {
            // http码
            uni
              .showToast({
                title: res.message || symErrorTip.requestError,
                icon: 'none',
              })
              .then((r) => {})
            Promise.reject(res)
          }
          if (res.code !== 200 || res.message == '401' || res.message == '403') {
            // 业务码
            uni
              .showToast({
                title: res.message || symErrorTip.requestError,
                icon: 'none',
              })
              .then((r) => {})
            // 清理用户信息,重新登录
            uni.navigateTo({ url: '/pages/login/login' })
            return Promise.reject(res)
          }
          reslove(res)
        },
        fail: (error) => {
          uni.showToast({
            title: error.errMsg || symErrorTip.requestError,
            icon: 'none',
          })
          reject(error)
        },
        complete: () => {
          //隐藏加载
          !hideLoading && uni.hideLoading()
        },
      })
    }) as Promise<I_RequestResult<T>>
  }
}
