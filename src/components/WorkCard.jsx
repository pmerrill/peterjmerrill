import React from "react";
import { Link } from "gatsby";
import { RichText } from "prismic-reactjs";
import styled from "@emotion/styled";
import dimensions from "styles/dimensions";
import colors from "styles/colors";
import PropTypes from "prop-types";

const WorkCardContainer = styled(Link)`
    display: grid;
    grid-template-columns: 4fr 7fr;
    box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.06);
    margin-bottom: 4em;
    transition: all 150ms ease-in-out;
    text-decoration: none;
    color: currentColor;

    @media(max-width:950px) {
        grid-template-columns: 4.5fr 7fr;
    }

    @media(max-width:${dimensions.maxwidthTablet}px) {
        grid-template-columns: 1fr;
    }

    @media(max-width:${dimensions.maxwidthMobile}px) {
        margin-bottom: 2em;
    }

    &:hover {
        box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.1);
        transition: all 150ms ease-in-out;

        .WorkCardAction {
            color: ${colors.blue500};
            transition: all 150ms ease-in-out;

            span {
                transform: translateX(0px);
                opacity: 1;
                transition: transform 150ms ease-in-out;
            }
        }

        .WorkCardContent::before {
            opacity: 0.02;
            transition: all 150ms ease-in-out;
        }

        .WorkCardImageContainer::before {
            opacity: 0.2;
            transition: all 150ms ease-in-out;
        }
    }
`

const WorkCardContent = styled("div")`
    background: white;
    padding: 4em 3em 2.25em 3em;
    position: relative;

    &:before {
        position: absolute;
        content: "";
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: ${colors.blue500};
        mix-blend-mode: multiply;
        opacity: 0;
        transition: all 150ms ease-in-out;
    }

    @media(max-width:950px) {
        padding: 3.25em 2.5em 2em 2.5em;
    }

    @media(max-width:${dimensions.maxwidthTablet}px) {
        grid-row: 2;
    }
`

const WorkCardTitle = styled("h3")`
    margin-bottom: 0.5em;
    margin-top: 0.5em;
`

const WorkCardCompany = styled("h5")`
    margin-bottom: 0.5em;
    margin-top: 0.5em;
`

const WorkCardStartEndDate = styled("div")`
    margin-bottom: 0.5em;
    margin-top: 0.5em;
`

const WorkCardLocation = styled("div")`
    margin-bottom: 0.5em;
    margin-top: 0.5em;
`

const WorkCardBlurb = styled("div")`
    margin-bottom: 0.5em;
    margin-top: 0.5em;
    margin-bottom: 5em;

    @media(max-width:${dimensions.maxwidthTablet}px) {
        margin-bottom: 2.5em;
    }
`

const WorkCardAction = styled("div")`
    font-weight: 600;
    text-decoration: none;
    color: currentColor;
    transition: all 150ms ease-in-out;

    span {
        margin-left: 1em;
        transform: translateX(-8px);
        display: inline-block;
        transition: transform 400ms ease-in-out;
    }
`

const WorkCardImageContainer = styled("div")`
    background: ${colors.grey200};
    display: flex;
    justify-content: center;
    align-items: flex-end;
    overflow: hidden;
    position: relative;
    padding-left: 2em;
    padding-right: 2em;

    @media(max-width:${dimensions.maxwidthTablet}px) {
        padding-top: 3em;
        max-height: 200px;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }

    &:before {
        position: absolute;
        content: "";
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: ${colors.blue500};
        mix-blend-mode: multiply;
        opacity: 0;
        transition: all 150ms ease-in-out;
    }

    img {
        max-width: 400px;
        width: 100%;
        box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.04);

        @media(max-width:${dimensions.maxwidthTablet}px) {
            max-width: 300px;
        }
    }
`

const WorkCard = ({ category, title, company, start_date, end_date, location, description, thumbnail, uid}) => (
    <WorkCardContainer to={`/work/${uid}`}>
        <WorkCardContent className="WorkCardContent">
            <WorkCardTitle>
                {title[0].text}
            </WorkCardTitle>
            <WorkCardCompany>
                {company[0].text}
            </WorkCardCompany>
            <WorkCardStartEndDate>
                {start_date[0].text} - {end_date[0].text}
            </WorkCardStartEndDate>
            <WorkCardLocation>
                {location[0].text}
            </WorkCardLocation>
            <WorkCardBlurb>
                {RichText.render(description)}
            </WorkCardBlurb>
            <WorkCardAction className="WorkCardAction">
                Details <span>&#8594;</span>
            </WorkCardAction>
        </WorkCardContent>
        <WorkCardImageContainer className="WorkCardImageContainer">
            <img src={thumbnail.url} alt={title[0].text}/>
        </WorkCardImageContainer>
    </WorkCardContainer>
)

export default WorkCard;

WorkCard.propTypes = {
    category: PropTypes.array.isRequired,
    thumbnail: PropTypes.object.isRequired,
    title: PropTypes.array.isRequired,
    company: PropTypes.array.isRequired,
    start_date: PropTypes.array.isRequired,
    end_date: PropTypes.array.isRequired,
    location: PropTypes.array.isRequired,
    description: PropTypes.array.isRequired,
    uid: PropTypes.string.isRequired
}
