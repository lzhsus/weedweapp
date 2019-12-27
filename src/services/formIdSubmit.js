
import Api from '../services/api/index'
import appConfig from '../common/app_config'
export default (e)=>{
    console.log(e)
    let detail = e.detail
    let formId = detail.formId||appConfig.formId
    let key = detail.value.key
    appConfig.formId = formId
    Api.formId({
        formID: formId,
        key: key
    })
}