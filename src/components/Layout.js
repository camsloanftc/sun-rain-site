import React from 'react'

import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

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
  <div>
  <Helmet
  title={data.contentfulHomePage.websiteTitle}
  meta={[{ name: 'description', content: data.contentfulHomePage.websiteDescription }]}
				>
  <link href="https://fonts.googleapis.com/css?family=Lustria" rel="stylesheet" />
  <html lang="en" />
				</Helmet>
  <div>{children}</div>
			</div>
		)}
	/>
)

export default Layout
