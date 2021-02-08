import { mapState, mapMutations, mapActions } from 'vuex';

import store from '@/store';

const states = Object.keys(store.state);
const mutations = Object.keys(store._mutations);
const actions = Object.keys(store._actions);

export default {
    methods: { ...mapMutations(mutations), ...mapActions(actions) },
    computed: { ...mapState(states) },
}