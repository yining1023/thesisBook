import {defaultsDeep, forEach, reduce, shuffle} from 'lodash'

export const selectProject = (state, slug) => {
  const project = state.projects[slug]

  return defaultsDeep({}, project, defaultProject)
}

export const getFilteredProjects = state => {
  const projects = Object.values(state.projects)
  const filters = state.filters

  return shuffle(projects).filter(project => {
    // by default let's assume both advisor and categories match for all projects
    let matchAdvisor = true
    let matchCategory = true
    let matchSearch = true

    // if filters.advisor is set, update matchAdvisor boolean
    if (filters.advisor !== '') {
      matchAdvisor = project.advisor_id === filters.advisor
    }

    // if filters.category is set, update matchCategory boolean
    if (filters.category !== '') {
      // we use lodash.get here to protect
      // matchCategory = (project.topics[0] && get(project, 'topics[0].slug') === filters.category) || (project.topics[1] && get(project, 'topics[1].slug') === filters.category)
      const alltopics = reduce(project.topics, (acc, topic) => {
        return acc + topic.slug
      }, '')
      matchCategory = alltopics.indexOf(filters.category) === -1 ? false : true
    }

    if (filters.search !== null && filters.search !== []) {
      matchSearch = filters.search.indexOf(parseInt(project.student_id)) !== -1
    }

    // apply both categories and return
    return matchCategory && matchAdvisor && matchSearch
  })
}



const defaultProject = {
  student_id: '',
  student_name: '',
  student_slug: '',
  advisor_id: '',
  project_title: '',
  project_question: '',
  video_presentation_url: '',
  portfolio_icon: {
    src: '',
    title: '',
    alt: '',
    caption: '',
  },
  topics: [{
    name: '',
    slug: '',
  }],
  slide_show: [],
}
