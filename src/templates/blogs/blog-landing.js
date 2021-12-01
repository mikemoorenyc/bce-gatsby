import { Link, graphql } from "gatsby";
import Layout from "../../components/Layout"
import LandingHeader from "../../components/LandingHeader";
import React from "react";
import { HtmlStrip, truncateString } from '../../utilities'
import BlogItem from "../../components/BlogItem";
import Pagination from "../../components/Pagination";
import {
  blogItemPadding
} from "./blogstyles.module.scss";

export default function BlogLanding({data,pageContext}) {

    const {numPages, currentPage} = pageContext;
    const posts = data.allWpPost.edges
    const prevPage = (currentPage <= 2) ? "" : (currentPage - 1).toString(); 
    const {pageInfo} = data 
    return <Layout 
              activeMenu={"Writing"}
              pageTitle={pageInfo.title} 
              headerLink={pageInfo.link}
              headerDescription={HtmlStrip(pageInfo.content)}>
                <LandingHeader pageTitle={pageInfo.title} copy={pageInfo.content} />
                <div>
                {posts.map(( {node} ) => {
                  return <BlogItem {...node} extraClasses={blogItemPadding} key={node.slug} />
                })}
                </div>
                <Pagination 
                  prevLink={(currentPage !== 1) ? `/blog/${prevPage}` : null}
                  nextLink={(currentPage !== numPages) ?`/blog/${(currentPage + 1).toString()}`: null}
                />
        
    </Layout>
}

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    pageInfo : wpPage(slug: {eq: "blog"}) {
      content
      title
      link
    }
    allWpPost(sort: {fields: date, order: DESC}, limit: $limit, skip: $skip) {
        totalCount
        edges {
          node {
            title
            slug
            link
            date(fromNow: true)
            excerpt
          }
        }
      }
    
  } 
`