import Vue from 'vue'
import Vuex from 'vuex'
import router from "../router"
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: "",
        apiKey: "",
    },
    getters: {
        isAuthenticated(state) {
            return state.token !== ""
        },
        getApiKey(state) {
            return 'edd1c9f034335f136f87ad84b625c8f1'
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        clearToken(state) {
            state.token = ""
        }
    },
    actions: {
        initAuth({commit, dispatch}) {
            let token = localStorage.getItem("token")

            if (token) {
                axios.defaults.headers.common['Authorization'] = "Bearer " + token
                commit("setToken", token)
                // let expirationDate = localStorage.getItem("expirationDate")
                // let time = new Date().getTime()
                //
                // if (time >= +expirationDate) {
                //     console.log("token süresi geçmiş...")
                //     dispatch("logout")
                // } else {
                //     commit("setToken", token)
                //     let timerSecond = +expirationDate - time
                //     console.log(timerSecond)
                //     dispatch("setTimeoutTimer", timerSecond)
                //     router.push("/")
                // }

            } else {
                //router.push("/auth")
                return false
            }
        },
        login({commit, dispatch, state}, authData) {
            let authLink = "api/token/"
            return axios.post(
                authLink,
                {username: authData.username, password: authData.password}
            ).then(response => {
                commit("setToken", response.data.access)
                localStorage.setItem("token", response.data.access)
                if (response.data.access) {
                    axios.defaults.headers.common['Authorization'] = "Bearer " + response.data.access
                } else {
                    axios.defaults.headers.common['Authorization'] = ""
                }
            })
        },
        register({dispatch}, authData) {
            let authLink = "api/register/"
            return axios.post(authLink, {
                email: authData.email, first_name: authData.first_name, username: authData.username,
                last_name: authData.last_name, password: authData.password, is_superuser: authData.is_superuser
            }).catch(r => {
                console.log(r)
            })
        },
        logout({commit}) {
            commit("clearToken")
            localStorage.removeItem("token")
            // localStorage.removeItem("expirationDate")
            router.replace("/auth")
        },
        setTimeoutTimer({dispatch}, expiresIn) {
            setTimeout(() => {
                dispatch("logout")
            }, expiresIn)
        }

    },
    modules: {}
})