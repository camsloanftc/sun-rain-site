import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

class ThemeProviderBasic extends React.Component {
	render() {
		return <div>{this.props.children({ primaryColor: this.props.primaryColor })}</div>
	}
}

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
