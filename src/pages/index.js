import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled, { css } from 'react-emotion'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'

import ThemeProvider from '../styles/ThemeProvider'

library.add(fab)

const IconLink = styled('a')`
	margin-right: 20px;
	color: ${props => props.color};
`

const linkContainer = css`
	display: flex;
	margin: 10px 0;
	// width: 100%;
	justify-content: space-between;
`

const Links = ({ linksArray }) => (
	<div className={linkContainer}>
		{linksArray.map((link, index) => (
			<div key={index}>
				<IconLink target="_blank" color="black" href={link.url}>
					<FontAwesomeIcon icon={['fab', link.title]} size="lg" />
				</IconLink>
			</div>
		))}
	</div>
)

const Index = ({ homePageData }) => {
	const {
		backgroundImageDesktop,
		youTubeUrl,
		facebookUrl,
		backgroundImageMobile,
		contactEmailAddress,
		spotifyArtistUrl,
		soundcloudUrl,
		appleMusicUrl,
		bandcampUrl,
		websiteDescription,
		websiteTitle,
		instagramUrl,
	} = homePageData

	return (
		<ThemeProvider>
			{({ primaryColor, somethingElse }) => {
				const desktopStyle = css`
					font-family: 'Lustria', serif;
					color: ${primaryColor};
					background: lightgrey;
					height: 100vh;
					width: 100%;
					display: flex;
          justify-content: center;
          background-color:black;
          background-image: url('${backgroundImageMobile.fixed.src}');
          background-size: cover;
					@media (min-width: 700px) {
						background-image: url('${backgroundImageDesktop.fixed.src}');
						background-size: cover;
					}
				`

				const flexContainer = css`
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					min-width: 200px;

					@media (min-width: 700px) {
						align-items: flex-start;
						position: absolute;
						left: 10%;
						top: 40%;
					}
				`

				const primaryFont = css`
					font-family: 'Lustria', serif;
				`

				console.log(primaryColor)

				const linksArray = [
					...(instagramUrl ? [{ title: 'instagram', url: instagramUrl }] : []),
					...(soundcloudUrl ? [{ title: 'soundcloud', url: soundcloudUrl }] : []),
					...(spotifyArtistUrl ? [{ title: 'spotify', url: spotifyArtistUrl }] : []),
					...(appleMusicUrl ? [{ title: 'apple', url: appleMusicUrl }] : []),
					...(bandcampUrl ? [{ title: 'bandcamp', url: bandcampUrl }] : []),
					...(youTubeUrl ? [{ title: 'youtube', url: youTubeUrl }] : []),
					...(facebookUrl ? [{ title: 'facebook', url: facebookUrl }] : []),
				]

				return (
					<>
						<Layout>
							<div className={desktopStyle}>
								<div className={flexContainer}>
									<h1 className={primaryFont}>{websiteTitle}</h1>
									<p>{websiteDescription}</p>
									<Links linksArray={linksArray} />
									{contactEmailAddress && (
										<IconLink color="black" href={`mailto:${contactEmailAddress}`}>
											contact
										</IconLink>
									)}
								</div>
							</div>
						</Layout>
					</>
				)
			}}
		</ThemeProvider>
	)
}

const IndexPage = () => (
	<StaticQuery
		query={graphql`
			query IndexQuery {
				contentfulHomePage(websiteTitle: { ne: "DONOTDELETE" }) {
					websiteTitle
					websiteDescription
					primaryColor
					appleMusicUrl
					instagramUrl
					bandcampUrl
					facebookUrl
					youTubeUrl
					spotifyArtistLink
					soundcloudUrl
					contactEmailAddress
					backgroundImageMobile {
						fixed(width: 1000) {
							width
							height
							src
							srcSet
						}
					}
					backgroundImageDesktop {
						fixed(width: 2000) {
							width
							height
							src
							srcSet
						}
					}
				}
			}
		`}
		render={data => <Index homePageData={data.contentfulHomePage} />}
	/>
)

export default IndexPage
