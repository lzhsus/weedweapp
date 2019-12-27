import appConfig from '../common/app_config'
let objApi = {}

objApi.specsShowFor = (subs, obj)=>{
  return subs.some((obj1)=>{
    return obj1.specs.some((obj2)=>{
      return obj2.spec_id==obj.id
    })
  })
}

objApi.subSpecsForList = (subSpecs, obj1, item)=>{
  obj1.list = []
  subSpecs.forEach(obj2 => {
    if( obj1.id==obj2.parent_id ){
      obj2.selected = false //默认字段
      obj2.active = false //默认字段
      if( objApi.specsShowFor(item.subs, obj2) ) {
        obj1.list.push(JSON.parse(JSON.stringify(obj2)))
      }
    }
  })
}

objApi.firstLevelID = (item,type)=>{  
  // 提取第一级有数据ID
  let ID
  let list = item.specs[0].list
  list.some(idObj1 => {
    return item.subs.some(idObj2 => {
      return idObj2.specs.some(idObj3 => {
        if( type ) idObj2.renum = 1
        if( idObj1.id==idObj3.spec_id&&idObj2.renum>0 ){
          ID = idObj1.id
          return true
        }
      })
    })
  })
  return ID
}

objApi.specsSubsArr = (item, ID, specsIndex, listItem)=>{
  let subsAll = []
  item.subs.forEach((obj1)=>{
    obj1.specs.forEach((obj2)=>{
      if( obj2.spec_id==listItem.id ){
        subsAll = subsAll.concat(obj1)  
      }
    })
  })
  return subsAll
}
 

export default objApi