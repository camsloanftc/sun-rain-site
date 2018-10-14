import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import './layout.css'

const Layout = ({ children }) => (
	<StaticQuery
		query={graphql`
			query SiteTitleQuery {
				contentfulHomePage(websiteTitle: { ne: "DONOTDELETE" }) {
					websiteTitle
					websiteDescription
				}
			}
		`}
		render={data => (
			<>
				<Helmet
					title={data.contentfulHomePage.websiteTitle}
					meta={[{ name: 'description', content: data.contentfulHomePage.websiteDescription }]}
				>
					<link href="https://fonts.googleapis.com/css?family=Lustria" rel="stylesheet" />
					<html lang="en" />
				</Helmet>
				<div>{children}</div>
			</>
		)}
	/>
)

Layout.propTypes = {
	children: PropTypes.node.isRequired,
}

export default Layout
