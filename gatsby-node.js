const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allAirtable(filter: {table: {eq: "Media"}}) {
	edges {
	  node {
	    data {
	      Media {
		localFiles {
		  childImageSharp {
		    id
		  }
		}
	      }
	    }
	  }
	}
      }
    }
  `)
  result.data.allAirtable.edges.forEach(edge => {
    edge.node.data.Media.localFiles.forEach(({ childImageSharp: { id } }) => {
      console.log(id);
      createPage({
        path: `/media/${id}`,
	component: path.resolve(`./src/templates/image.js`),
	context: {
	  id
	},
      });
    });
  });
}
