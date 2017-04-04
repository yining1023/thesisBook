import React from 'react'
import s from './FilterMenu.css'
import {connect} from 'react-redux'
import {advisorsIds} from '../../constants/advisorIds'
import {resetSearch, search, setAdvisorFilter, setCategoryFilter} from '../../redux/actions/filters'
import {getFilteredProjects} from '../../redux/selectors/projects'
import {TextField, SelectField, MenuItem} from 'material-ui'
import {Link} from 'react-router-dom'

const mapStateToProps = state => ({
  filters: state.filters,
  visibleProjects: getFilteredProjects(state),
  searchResults: state.searchResults
})

const actions = {
  setAdvisorFilter,
  setCategoryFilter,
  search,
  resetSearch,
}

class FilterMenu extends React.Component {

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

  render() {
    const { advisor, category } = this.props.filters

    return (
    <div className={s.filters}>

      <SelectField
        autoWidth={true}
        floatingLabelText="BY TOPIC"
        value={category}
        onChange={this.handleCategoryChange}
        floatingLabelStyle={{color: 'rgba(255, 255, 255, 0.8)'}}
        labelStyle={{color: 'white'}}
        selectedMenuItemStyle={{fontWeight: 900, color: '#403ca0'}}
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

      <SelectField
        autoWidth={true}
        floatingLabelText="BY ADVISOR"
        value={advisor}
        onChange={this.handleAdvisorChange}
        floatingLabelStyle={{color: 'rgba(255, 255, 255, 0.8)'}}
        labelStyle={{color: 'white'}}
        selectedMenuItemStyle={{color: '#403ca0'}}
      >
        <MenuItem value='' primaryText='' />
        <MenuItem value={advisorsIds.ANDREW} primaryText='ANDREW LAZAROW' />
        <MenuItem value={advisorsIds.GABE} primaryText='GABRIEL BARCIA-COLOMBO' />
        <MenuItem value={advisorsIds.KATHERINE} primaryText='KATHERINE DILLON' />
        <MenuItem value={advisorsIds.KATHLEEN} primaryText='KATHLEEN WILSON' />
        <MenuItem value={advisorsIds.NANCY} primaryText='NANCY HECHINGER' />
        <MenuItem value={advisorsIds.ROBIN} primaryText='ROBIN REID' />
      </SelectField>

      <TextField
        hintText='Keyword or Student Name'
        floatingLabelText='SEARCH'
        onChange={this.handleSearchChange}
        underlineFocusStyle={{borderColor: 'white'}}
        floatingLabelStyle={{color: 'rgba(255, 255, 255, 0.8)'}}
        floatingLabelFocusStyle={{color: 'white'}}
        hintStyle={{color: 'rgba(255, 255, 255, 0.39)'}}
        inputStyle={{color: 'white'}}
      />
    </div>
    )
  }

}

export default connect(mapStateToProps, actions)(FilterMenu)
