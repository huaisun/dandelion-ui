const actions = {
    putDomain(state, v) {
        state.commit('SET_DOMAIN', v);
    },
    putUser(state, v) {
        state.commit('SET_USER', v);
    }
}

export default actions;