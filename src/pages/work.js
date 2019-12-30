import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import Layout from "components/Layout";
import ProjectCard from "components/WorkCard";

const ProjectTitle = styled("h1")`
    margin-bottom: 1em;
`

const Project = ({ projects, meta }) => (
    <>
        <Helmet
            title={`Work | Peter Merrill`}
            titleTemplate={`%s`}
            meta={[
                {
                    name: `description`,
                    content: meta.description,
                },
                {
                    property: `og:title`,
                    content: `Work | Peter Merrill`,
                },
                {
                    property: `og:description`,
                    content: meta.description,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    name: `twitter:creator`,
                    content: meta.author,
                },
                {
                    name: `twitter:title`,
                    content: meta.title,
                },
                {
                    name: `twitter:description`,
                    content: meta.description,
                },
            ].concat(meta)}
        />
        <Layout>
            <ProjectTitle>
                Work
            </ProjectTitle>
            <>
                {projects.map((project, i) => (
                    <ProjectCard
                        key={i}
                        category={project.node.project_category}
                        title={project.node.project_title}
                        company={project.node.project_company}
                        start_date={project.node.project_start_date}
                        location={project.node.project_location}
                        website={project.node.project_website}
                        description={project.node.project_preview_description}
                        languages={project.node.project_languages}
                        frameworks={project.node.project_frameworks}
                        libraries={project.node.project_libraries}
                        software={project.node.project_software}
                        thumbnail={project.node.project_preview_thumbnail}
                        uid={project.node._meta.uid}
                    />
                ))}
            </>
        </Layout>
    </>
);

export default ({ data }) => {
    const projects = data.prismic.allProjects.edges;
    const meta = data.site.siteMetadata;
    if (!projects) return null;

    return (
        <Project projects={projects} meta={meta}/>
    )
}

Project.propTypes = {
    projects: PropTypes.array.isRequired,
};

export const query = graphql`
    {
        prismic {
            allProjects(where: {project_category_fulltext: "work"}) {
                edges {
                    node {
                        project_title
                        project_preview_description
                        project_preview_thumbnail
                        project_category
                        project_company
                        project_start_date
                        project_location
                        project_website
                        project_languages
                        project_frameworks
                        project_libraries
                        project_software
                        project_post_date
                        _meta {
                            uid
                        }
                    }
                }
            }
        }
        site {
            siteMetadata {
                title
                description
                author
            }
        }
    }
`
