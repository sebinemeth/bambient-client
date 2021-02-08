import { mapState, mapMutations } from 'vuex';

import store from '@/store';

const states = Object.keys(store.state);
const mutations = states.map(state => 'set' + state.charAt(0).toUpperCase() + state.slice(1))

export default {
    methods: { ...mapMutations(mutations), },
    computed: { ...mapState(states) },
}