import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { RichText } from "prismic-reactjs";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import colors from "styles/colors";
import dimensions from "styles/dimensions";
import Avatar from "images/avatar.jpg";
import Button from "components/_ui/Button";
import Layout from "components/Layout";

const Hero = styled("div")`
    padding-top: 2.5em;
    padding-bottom: 3em;
    margin-bottom: 6em;
    max-width: 100%;

    @media(max-width:${dimensions.maxwidthMobile}px) {
       margin-bottom: 3em;
    }

    h1 {
        font-size: 2.6em;
        margin-bottom: 1em;

        a {
            text-decoration: none;
            transition: all 100ms ease-in-out;

            &:nth-of-type(1) { color: ${colors.orange500}; }
            &:nth-of-type(2) { color: ${colors.green500}; }
            &:nth-of-type(3) { color: ${colors.purple500}; }
            &:nth-of-type(4) { color: ${colors.teal500}; }
            &:nth-of-type(5) { color: ${colors.blue500}; }

            &:hover {
                cursor: pointer;
                transition: all 100ms ease-in-out;

                &:nth-of-type(1) { color: ${colors.orange600};  background-color: ${colors.orange200};}
                &:nth-of-type(2) { color: ${colors.green600};   background-color: ${colors.green200};}
                &:nth-of-type(3) { color: ${colors.purple600};  background-color: ${colors.purple200};}
                &:nth-of-type(4) { color: ${colors.teal600};    background-color: ${colors.teal200};}
                &:nth-of-type(5) { color: ${colors.blue600};    background-color: ${colors.blue200};}

            }
        }
    }

    div.AvatarContainer {
        border-bottom: 4px solid #4a4f49;
    }
`

const HeroAvatar = styled("img")`
    max-width: 100px;
    margin-top: 0em;
    display: block;
`

const RenderBody = ({ home, meta }) => (
    <>
        <Helmet
            title={meta.title}
            titleTemplate={`%s | ${meta.title}`}
            meta={[
                {
                    name: `description`,
                    content: meta.description,
                },
                {
                    property: `og:title`,
                    content: meta.title,
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
        <Hero>
            <div className="AvatarContainer">
                <HeroAvatar className="HeroAvatar" src={Avatar} />
            </div>
            <>
                {RichText.render(home.hero_title)} {RichText.render(home.content)}
            </>
            <a href="https://github.com/pmerrill" target="_blank" rel="noopener noreferrer">
                <Button>
                    <p>My Repositories</p>
                </Button>
            </a>
        </Hero>
    </>
);

export default ({ data }) => {
    //Required check for no data being returned
    const doc = data.prismic.allHomepages.edges.slice(0, 1).pop();
    const meta = data.site.siteMetadata;

    if (!doc) return null;

    return (
        <Layout>
            <RenderBody home={doc.node} meta={meta}/>
        </Layout>
    )
}

RenderBody.propTypes = {
    home: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
};

export const query = graphql`
    {
        prismic {
            allHomepages {
                edges {
                    node {
                        hero_title
                        content
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
