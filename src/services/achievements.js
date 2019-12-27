import appConfig from '../common/app_config'
let objApi = {}

objApi.myAchievements = (achievements, userAchievements)=>{
  // 所有徽章
  achievements.forEach(obj1 => {
      let rules = obj1.rules
      // 所有等级
      rules.forEach(item=>{
          let img_url = item.img_url          
          item.img_url = img_url.indexOf("http")!=-1?img_url:appConfig.oss+img_url
          item.data = {}
          if( item.level==0 ) obj1.userAchievements = item //默认0级
      })

      // 用户获得徽章
      userAchievements.forEach(obj2 => {
          if( obj1.id==obj2.medela_achievement_id ){
              // 徽章对应等级
              rules.forEach(obj3=>{
                  if( obj2.medela_achievement_rule_id==obj3.id ){
                      obj3.data = obj2.data||{}
                      obj1.userAchievements = obj3
                  }
              })
          }
      })
  })
  return achievements
}

objApi.exchangeAchievements = (achievements, achievementsItem, userAchievements)=>{
  // 所有徽章
  achievements.forEach(achievementsObj1 => {
    let rules = achievementsObj1.rules
    // 商品需要徽章
    achievementsItem.forEach(achievementsObj2 => {
      if( achievementsObj1.id==achievementsObj2.medela_achievement_id ){
        // 徽章对应等级
        rules.forEach(achievementsObj3=>{
          let img_url = achievementsObj3.img_url  
          achievementsObj3.img_url = img_url.indexOf("http")!=-1?img_url:appConfig.oss+img_url

          // 对应徽章数据
          if( achievementsObj2.medela_achievement_rule_id==achievementsObj3.id ){
            achievementsObj2.achievements = achievementsObj3
            achievementsObj2.rules = rules
            achievementsObj2.desc = achievementsObj1.desc
          }
          // 用户当前等级
          userAchievements.forEach(userAchievementsObj1=>{
            if( userAchievementsObj1.medela_achievement_rule_id==achievementsObj3.id ){
              achievementsObj2.userAchievements = achievementsObj3
              achievementsObj2.userAchievements.data = userAchievementsObj1.data
            }
            if( !achievementsObj2.userAchievements ){
              achievementsObj2.userAchievements = {
                level: 0
              }
            }
          })
        })
      }
    })
  })
  return achievementsItem
}

objApi.selectedAchievements = (item, achievements, userAchievements)=>{
  let achievementsItem = item.achievements||[] // 商品需要徽章
  achievementsItem = objApi.exchangeAchievements(achievements, achievementsItem, userAchievements)
  item.selected_sku.achievements = achievementsItem
}


export default objApi