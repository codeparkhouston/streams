import React from 'react';
import Img from "gatsby-image";
import { Link, graphql } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import startCase from 'lodash/startCase';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Page from '../components/Page';

const PicturesListTemplate = ({ data }) => {
  const {
    title,
    subtitle
  } = data.site.siteMetadata;

  const pictures = data.allAirtable.edges
    .map(e => e.node.data)
    .map(({ Date_Taken, Tag_Line, Media: { localFiles }}) => (
      localFiles.map(({ fluid }) => ({
        Date_Taken,
        Tag_Line,
        fluid,
      }))
    ))
    .flat();

  console.log({ pictures });
  return (
    <Layout title={`Pictures - ${title}`} description={subtitle}>
      <Sidebar />
      <Page title="Pictures">
        <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 10}}>
          {pictures.map(({ Date_Taken, Media, Tag_Line }) => (
              <Img
                fluid={Media.file.childImageSharp.fluid}
              />
          ))}
        </div>
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query PicturesListQuery {
    site {
      siteMetadata {
        title
        subtitle
      }
    }
    allAirtable(filter: {table: {eq: "Media"}}, sort: {fields: data___Date_Taken, order: DESC}) {
      edges {
        node {
          data {
            Date_Taken(formatString: "YYYY-MM-DD")
            Media {
              localFiles {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            Tag_Line
          }
        }
      }
    }
  }
`;

export default PicturesListTemplate;
