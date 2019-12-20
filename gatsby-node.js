const path = require('path');

// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
const wrapper = promise =>
    promise.then(result => {
        if (result.errors) {
            throw result.errors
        }
        return result
    });

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const result = await wrapper(
        graphql(`
        {
            prismic {
                allProjects {
                    edges {
                        node {
                            project_title
                            project_preview_description
                            project_preview_thumbnail
                            project_category
                            project_post_date
                            project_company
                            project_start_date
                            project_end_date
                            project_location
                            project_website
                            project_languages
                            project_frameworks
                            project_libraries
                            project_software
                            _meta {
                                uid
                            }
                        }
                    }
                }
                allPosts {
                    edges {
                        node {
                            post_title
                            post_hero_image
                            post_hero_annotation
                            post_date
                            post_category
                            post_body
                            post_preview_description
                            post_author
                            _meta {
                                uid
                            }
                        }
                    }
                }
            }
        }
    `)
    )

    const workList = result.data.prismic.allProjects.edges;
    const projectsList = result.data.prismic.allProjects.edges;
    const postsList = result.data.prismic.allPosts.edges;

    const workTemplate = require.resolve('./src/templates/work.jsx');
    const projectTemplate = require.resolve('./src/templates/project.jsx');
    const postTemplate = require.resolve('./src/templates/post.jsx');

    workList.forEach(edge => {
        // The uid you assigned in Prismic is the slug!
        createPage({
            type: 'Work',
            match: '/work/:uid',
            path: `/work/${edge.node._meta.uid}`,
            component: workTemplate,
            context: {
                // Pass the unique ID (uid) through context so the template can filter by it
                uid: edge.node._meta.uid,
            },
        })
    })

    projectsList.forEach(edge => {
        // The uid you assigned in Prismic is the slug!
        createPage({
            type: 'Project',
            match: '/project/:uid',
            path: `/project/${edge.node._meta.uid}`,
            component: projectTemplate,
            context: {
                // Pass the unique ID (uid) through context so the template can filter by it
                uid: edge.node._meta.uid,
            },
        })
    })

    postsList.forEach(edge => {
        createPage({
            type: 'Project',
            match: '/blog/:uid',
            path: `/blog/${edge.node._meta.uid}`,
            component: postTemplate,
            context: {
                uid: edge.node._meta.uid,
            },
        })
    })
}
