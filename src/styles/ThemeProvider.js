import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

const ThemeProviderBasic = ({ primaryColor, children }) => <div>{children({ primaryColor })}</div>

const ThemeProvider = ({ children }) => (
  <StaticQuery
  query={graphql`
			query ThemeProvider {
				contentfulHomePage {
					primaryColor
				}
			}
		`}
  render={data => (
  <ThemeProviderBasic primaryColor={data.contentfulHomePage.primaryColor}>
  {children}
			</ThemeProviderBasic>
		)}
	/>
)

export default ThemeProvider
