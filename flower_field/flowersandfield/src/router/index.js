import Vue from 'vue'
import Router from 'vue-router'
import Interestgroup from '../components/Interestgroup/Interestgroup'
import ResearchSociety from "../components/ResearchSociety/ResearchSociety"


Vue.use(Router)

const routes = [{
    path: '/interestgroup',
    name: 'Interestgroup',
    component: Interestgroup
  },
  {
    path: '/researchsociety',
    name: 'ResearchSociety',
    component: ResearchSociety
  }
]

export default new Router({
  linkActiveClass: 'active',
  routes
})
