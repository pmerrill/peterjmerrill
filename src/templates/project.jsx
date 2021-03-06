import React from 'react';
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import styled from "@emotion/styled";
import colors from "styles/colors";
import { Link, graphql } from 'gatsby';
import { RichText } from "prismic-reactjs";
import Button from "components/_ui/Button";
import Layout from "components/Layout";

const ProjectHeroContainer = styled("div")`
    background: ${colors.grey200};
    display: flex;
    justify-content: center;
    align-items: flex-end;
    overflow: hidden;
    position: relative;
    padding-top: 2.25em;
    margin-top: 0.75em;
    margin-bottom: 3.5em;

    img {
        max-width: 600px;
    }
`

const ProjectTitle = styled("div") `
    max-width: 100%;
`

const ProjectCompany = styled("div") `
    max-width: 100%;

    h2 {
      margin-bottom: 0;
    }
`

const ProjectStartEndDate = styled("div") `
    max-width: 100%;

    p {
      margin-bottom: 0;
    }
`

const ProjectLocation = styled("div") `
    max-width: 100%;
`

const ProjectWebsite = styled("div") `
    max-width: 100%;
`

const ProjectBody = styled("div")`
    max-width: 100%;

    .block-img {
        margin-top: 3.5em;
        margin-bottom: 0.5em;

        img {
            width: 100%;
        }
    }
`

const ProjectLanguages = styled("div") `
    max-width: 100%;

    p {
        margin-top: 0.4em;
    }
`

const ProjectFrameworks = styled("div") `
    max-width: 100%;

    p {
        margin-top: 0.4em;
    }
`

const ProjectLibraries = styled("div") `
    max-width: 100%;

    p {
        margin-top: 0.4em;
    }
`

const ProjectSoftware = styled("div") `
    max-width: 100%;

    p {
        margin-top: 0.4em;
    }
`

const WorkLink = styled(Link)`
    margin-top: 3em;
    display: block;
    text-align: center;
`


const Project = ({ project, meta }) => {
    return (
        <>
            <Helmet
                title={`${project.project_title[0].text}`}
                titleTemplate={`%s`}
                meta={[
                    {
                        name: `description`,
                        content: meta.description,
                    },
                    {
                        property: `og:title`,
                        content: `${project.project_title[0].text}`,
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
                    {RichText.render(project.project_title)}
                </ProjectTitle>
                <ProjectCompany>
                    <h2 className="title">{project.project_company[0].text}</h2>
                </ProjectCompany>
                <ProjectStartEndDate>
                    {RichText.render(project.project_start_date)}
                </ProjectStartEndDate>
                <ProjectLocation>
                  {project.project_location[0].text}
                </ProjectLocation>
                <ProjectWebsite>
                  <a href={project.project_website[0].text} target="_blank" rel="noopener noreferrer">{project.project_website[0].text}</a>
                </ProjectWebsite>
                {project.project_hero_image && (
                    <ProjectHeroContainer>
                        <img src={project.project_hero_image.url} alt="bees" />
                    </ProjectHeroContainer>
                )}
                <ProjectBody>
                    {RichText.render(project.project_description)}
                </ProjectBody>
                <ProjectLanguages>
                    <h4 className="title">Languages</h4>
                    {RichText.render(project.project_languages)}
                </ProjectLanguages>
                <ProjectFrameworks>
                    <h4 className="title">Frameworks</h4>
                    {RichText.render(project.project_frameworks)}
                </ProjectFrameworks>
                <ProjectLibraries>
                    <h4 className="title">Libraries</h4>
                    {RichText.render(project.project_libraries)}
                </ProjectLibraries>
                <ProjectSoftware>
                    <h4 className="title">Software</h4>
                    {RichText.render(project.project_software)}
                </ProjectSoftware>
                <WorkLink to={"/projects"}>
                    <Button className="Button--secondary">
                        See other projects
                    </Button>
                </WorkLink>
            </Layout>
        </>
    )
}

export default ({ data }) => {
    const projectContent = data.prismic.allProjects.edges[0].node;
    const meta = data.site.siteMetadata;
    return (
        <Project project={projectContent} meta={meta}/>
    )
}

Project.propTypes = {
    project: PropTypes.object.isRequired,
};

export const query = graphql`
    query ProjectQuery($uid: String) {
        prismic {
            allProjects(uid: $uid) {
                edges {
                    node {
                        project_title
                        project_preview_description
                        project_preview_thumbnail
                        project_category
                        project_post_date
                        project_hero_image
                        project_description
                        project_company
                        project_start_date
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
