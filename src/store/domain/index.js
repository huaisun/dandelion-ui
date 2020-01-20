import state from './state'
import mutations from './mutations'
import actions from './actions'

//创建且声明一个对象
export default ({
    namespaced: true,
    state,
    mutations,
    actions,
})