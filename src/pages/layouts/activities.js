import PropTypes from 'prop-types'
import React from 'react'
import tw from 'tailwind-styled-components'

import { SideMenu } from '../../components/side-menu/sidemenu'

const ActivitiesWrapper = tw.div`
  h-screen 
  overflow-hidden
  flex
`

const ActivitiesLayout = ({ children }) => (
  <ActivitiesWrapper>
    <SideMenu />
    {children}
  </ActivitiesWrapper>
)

ActivitiesLayout.propTypes = {
  children: PropTypes.object,
}

export { ActivitiesLayout }
