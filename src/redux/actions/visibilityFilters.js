export const getVisibleProjects = (
  projects,
  filter
) => {
  switch (filter) {

  case 'SHOW_ALL':
    return projects

  case 'SHOW_CATEGORY_SOFTWARE':
    return projects.filter(
      p => p.advisor_id === "12"
    )

  case 'SHOW_CATEGORY_HARDWARE':
    return projects.filter(
      p => p.category === 'HARDWARE/ PRODUCT DESIGN'
    )

  }
}
