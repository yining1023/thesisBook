import React from 'react'
import s from './HomePage.css'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import {advisorsIds} from '../constants/advisorIds'
import {resetSearch, search, setAdvisorFilter, setCategoryFilter} from '../redux/actions/filters'
import {getFilteredProjects} from '../redux/selectors/projects'
import {Card, CardHeader, CardText, TextField} from 'material-ui'
import ActionHome from 'material-ui/svg-icons/action/home'
import {indigo500} from 'material-ui/styles/colors'

const mapStateToProps = state => ({
  filters: state.filters,
  visibleProjects: getFilteredProjects(state),
  searchResults: state.searchResults
})

const styles = {
  customWidth: {
    width: 200,
  },
}

const iconStyles = {
  marginLeft: 22,
}

const actions = {
  setAdvisorFilter,
  setCategoryFilter,
  search,
  resetSearch,
}

class HomePage extends React.Component {

  // static propTypes = {
  //   articles: PropTypes.arrayOf(PropTypes.shape({
  //     student_id: PropTypes.string.isRequired,
  //     project_title: PropTypes.string.isRequired,
  //     student_name: PropTypes.string.isRequired,
  //   }).isRequired).isRequired,
  // }

  handleAdvisorChange = (event, index, value) => {
    this.props.setAdvisorFilter(value)
  }

  handleCategoryChange = (event, index, value) => {
    this.props.setCategoryFilter(value)
  }

  handleSearchChange = (event) => {
    if (event.target.value) {
      return this.props.search(event.target.value)
    }
    return this.props.resetSearch()
  }

  mapScroll(e) {
    this.list.scrollLeft -= e.deltaX + e.deltaY
    e.preventDefault()
  }

  render() {
    const { advisor, category } = this.props.filters

    return (
      <div className={s.content}>
        <div className='filters'>
          <SelectField
            floatingLabelText="BY ADVISOR"
            value={advisor}
            onChange={this.handleAdvisorChange}
            style={styles.customWidth}
            autoWidth={false}
          >
            <MenuItem value='' primaryText='' />
            <MenuItem value={advisorsIds.ANDREW} primaryText='ANDREW LAZAROW' />
            <MenuItem value={advisorsIds.GABE} primaryText='GABRIEL BARCIA-COLOMBO' />
            <MenuItem value={advisorsIds.KATHERINE} primaryText='KATHERINE DILLON' />
            <MenuItem value={advisorsIds.KATHLEEN} primaryText='KATHLEEN WILSON' />
            <MenuItem value={advisorsIds.NANCY} primaryText='NANCY HECHINGER' />
            <MenuItem value={advisorsIds.ROBIN} primaryText='ROBIN REID' />
          </SelectField>

          <SelectField
            floatingLabelText="BY CATEGORY"
            value={category}
            onChange={this.handleCategoryChange}
            style={styles.customWidth}
            autoWidth={false}
          >
            <MenuItem value='' primaryText='' />
            <MenuItem value='artdrawing' primaryText='ART/DRAWING' />
            <MenuItem value='assistive-techhealth' primaryText='ASSISTIVE TECH/HEALTH' />
            <MenuItem value='data-vizimage-processing' primaryText='DATA VIZ/IMAGE PROCESSING' />
            <MenuItem value='education' primaryText='EDUCATION' />
            <MenuItem value='hardware-product-design' primaryText='HARDWARE/PRODUCT DESIGN' />
            <MenuItem value='immersive-environments' primaryText='IMMERSIVE ENVIRONMENTS' />
            <MenuItem value='installation' primaryText='INSTALLATION' />
            <MenuItem value='mobilesocial-media' primaryText='MOBILE/SOCIAL MEDIA' />
            <MenuItem value='musicsound' primaryText='MUSIC/SOUND' />
            <MenuItem value='performance' primaryText='PERFORMANCE' />
            <MenuItem value='social-goodjusticepolitics' primaryText='SOCIAL GOOD/JUSTICE POLITICS' />
            <MenuItem value='software-design' primaryText='SOFTWARE DESIGN' />
            <MenuItem value='speculative-design' primaryText='SPECULATIVE DESIGN' />
            <MenuItem value='storytelling' primaryText='STORYTELLING' />
            <MenuItem value='timelight' primaryText='TIME/LIGHT' />
            <MenuItem value='uiux' primaryText='UI/UX' />
            <MenuItem value='wearables' primaryText='WEARABLES' />
          </SelectField>
        </div>

        <TextField
          hintText='Keyword or Student Name'
          floatingLabelText='SEARCH'
          onChange={this.handleSearchChange}
        />

        <h4>Projects</h4>
        <ul ref={(elem) => {this.list = elem} } className={s.projectList} onWheel={this.mapScroll.bind(this)}>
          {this.props.visibleProjects.map(project =>
            <li className={s.projectTile} key={project.student_id}>
              <Link to={'/project/' + `${project.student_slug}`} className={s.a}>
              <Card className={s.projectCard}>
                  <ActionHome color={indigo500} style={iconStyles}/>
                <CardText className={s.verticalText}>
                  {project.student_name}
                </CardText>
              </Card>
              </Link>
            </li>
          )}
        </ul>

      </div>
    )
  }

}

export default connect(mapStateToProps, actions)(HomePage)
