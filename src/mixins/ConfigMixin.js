import { mapState, mapMutations } from 'vuex';

export default {
    methods: { ...mapMutations(["setShowSeconds", "setNoSleep"]), },
    computed: { ...mapState(["showSeconds", "noSleep"]) },
}