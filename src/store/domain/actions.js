const actions = {
    putAuthorityEdit(state, v) {
        state.commit('SET_AUTHORITY_EDIT', v);
    },
    putAuthorityLove(state, v) {
        state.commit('SET_AUTHORITY_LOVE', v);
    },
    putUserDomain(state, v) {
        state.commit('SET_USER_DOMAIN', v);
    },
    putCategoryForm(state, v) {
        state.commit('SET_CATEGORY_FORM', v);
    },
    putLinkForm(state, v) {
        state.commit('SET_LINK_FORM', v);
    }
}

export default actions;