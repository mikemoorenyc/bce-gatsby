import {
    mpContainer,
    slimCard,
    postItemsContainer
} from "./styles.module.scss";
import PropTypes from "prop-types";
import Card from "../Card";
import React from "react";
import SmallHeader from "../SmallHeader";


const MorePosts = ({posts,title}) => {
    return <div className={` ${mpContainer} `}>
        <SmallHeader copy={title} />
        <div className={postItemsContainer}>
        {posts.map(e=> {
            e.desc = e.excerpt
           e.featuredImage = null;
        return <Card key={e.slug} {...e}  extraClasses={slimCard} styleMod={"slim"}/>})}
        </div>

    </div>
}  
MorePosts.defaultProps = {
    title: "More Posts"
}
MorePosts.propTypes = {
    title: PropTypes.string
    posts : PropTypes.arrayOf(
        PropTypes.shape(
            slug: PropTypes.string,.isRequired
            desc : PropTypes.string,
            excerpt: PropTypes.string,
            kicker: PropTypes.string
        )
    ).isRequired
}

export default MorePosts
