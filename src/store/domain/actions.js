const actions = {
    putAuthorityEdit(state, v) {
        state.commit('SET_AUTHORITY_EDIT', v);
    },
    putUserDomain(state, v) {
        state.commit('SET_USER_DOMAIN', v);
    }
}

export default actions;