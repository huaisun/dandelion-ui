const mutations = {
    SET_AUTHORITY_EDIT(state, v) {
        state.authority.edit = v;
    },
    SET_USER_DOMAIN(state, v) {
        state.user.domain = v;
    },
    SET_CATEGORY_FORM(state, v) {
        state.category.form = v;
    }
}

export default mutations;