import PropTypes from "prop-types"
import React from "react"
import tw from "tailwind-styled-components"

import SideMenu from "../../components/side-menu/sidemenu"

const ActivitiesWrapper = tw.div`
  h-screen 
  overflow-hidden
  flex
`

const TopMenuWrapper = tw.div`
  flex-1 
  flex 
  flex-col
`

const Activities = ({ children }) => (
  <ActivitiesWrapper>
    <SideMenu />
    <TopMenuWrapper>{children}</TopMenuWrapper>
  </ActivitiesWrapper>
)

Activities.propTypes = {
  children: PropTypes.object,
}

export default Activities
