import React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import colors from "styles/colors";
import dimensions from "styles/dimensions";
//import Logo from "components/_ui/Logo";

const HeaderContainer = styled("div")`
    padding-top: 3em;
    padding-bottom: 1em;
`

const HeaderContent = styled("div")`
    display: flex;
    justify-content: space-between;
    font-weight: 600;

    a,a.Link--is-logo {
        color: ${colors.blue500};
        text-decoration: none;
        border-bottom: 3px solid transparent;
        font-weight: 600;
        font-size: 1.45em;
        height: 100%;
        padding-bottom: 0em;
        padding-top: 0em;
        display: block;
        position: relative;
    }
`

const HeaderLinks = styled("div")`
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-gap: 7em;
    justify-content: flex-end;
    width: 100%;
    max-width: 200px;
    font-size: 0.95em;

    @media(max-width: ${dimensions.maxwidthTablet}px) {
        grid-gap: 5.5em;
    }

    @media(max-width: ${dimensions.maxwidthMobile}px) {
        grid-gap: 2.5em;
    }

    a {
        color: currentColor;
        text-decoration: none;
        border-bottom: 3px solid transparent;
        font-weight: 600;
        font-size: 0.95em;
        height: 100%;
        padding-bottom: 1.25em;
        padding-top: 0.25em;
        display: block;
        position: relative;

        &:after {
            position: absolute;
            content: "";
            bottom: 0;
            width: 18px;
            height: 3px;
            background: transparent;
            bottom: -3px;
            right: 50%;
            margin-right: -9px;
            transition: 100ms ease-in-out background;
        }

        &:hover {
            &:after {
                background: ${colors.blue500};
                transition: 100ms ease-in-out background;
            }
        }

        &.Link--is-active {
            &:after {
                background: ${colors.blue500};
                transition: 100ms ease-in-out background;
            }
        }
    }
`

const Header = () => (
    <HeaderContainer>
        <HeaderContent>
            <Link activeClassName="Link--is-logo" to="/">
                Peter Merrill
            </Link>
            <HeaderLinks>
                <Link
                    activeClassName="Link--is-active"
                    to="/work">
                    Work
                </Link>
                <Link
                    activeClassName="Link--is-active"
                    to="/projects">
                    Projects
                </Link>
                <a href="https://prismic-io.s3.amazonaws.com/peterjmerrill/4931312d-e601-450b-ba8e-51cf31d595a6_Peter-Merrill%281%29.pdf" target="_blank" rel="noopener noreferrer">
                  Résumé
                </a>
            </HeaderLinks>
        </HeaderContent>
    </HeaderContainer>
)

export default Header;
