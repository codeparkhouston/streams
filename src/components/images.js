import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

const Images = () => {
  const data = useStaticQuery(graphql`
    query {
      allAirtable(filter: {table: {eq: "Media"}}, sort: {fields: data___Date_Taken, order: DESC}) {
	edges {
	  node {
	    data {
	      Date_Taken(formatString: "YYYY-MM-DD")
	      Media {
		localFiles {
		  childImageSharp {
		    fluid(maxWidth: 800) {
                      ...GatsbyImageSharpFluid_noBase64
		    }
                    id
		  }
		}
	      }
	      Tag_Line
	    }
	  }
	}
      }
    }
  `)

  return data.allAirtable.edges.map(edge =>
    <div>
      <div className="media-container">
        { edge.node.data.Media.localFiles.map(files =>
          <React.Fragment>
            <Link className="media-image" to={`/media/${files.childImageSharp.id}`}>
              <Img style={{height: "100%"}} fluid={files.childImageSharp.fluid} />
            </Link>
          </React.Fragment>
        )}
      </div>
      <p>{edge.node.data.Date_Taken} - {edge.node.data.Tag_Line}</p>
    </div>
  );
}

export default Images
