import React from "react"
import { graphql } from "gatsby"
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

const Image = ({ data }) => {
  return (
    <React.Fragment>
      <Img className="media-image" fluid={data.imageSharp.fluid} />
    </React.Fragment>
  );
}

export const query = graphql`
  query($id: String!) {
    imageSharp(id: {eq: $id}) {
      fluid(maxWidth: 800) {
        ...GatsbyImageSharpFluid_noBase64
      }
    }
  }
`;


export default Image
