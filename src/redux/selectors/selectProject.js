import {defaultsDeep} from 'lodash'

export const selectProject = (state, slug) => {
  const project = state.projects[slug]

  return defaultsDeep({}, project, defaultProject)
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
  tags: [{
    name: '',
    slug: '',
  }],
  slide_show: [],
}

