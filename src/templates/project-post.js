import React from "react"
import Layout from "../components/Layout"

import {mainBg} from "./styles/project.module.scss";
import { graphql } from "gatsby"

export default function ProjectPost({ data }) {
    console.log(mainBg) 
  return (
  <Layout pageTitle={data.wpProject.title}>
    <main className={mainBg}>
 
      <h1>{data.wpProject.title}</h1>
      {data.wpProject.whatilearned}
      
  </main>
  </Layout>
  
  )
}
export const query = graphql`
  query($slug: String!) {
    wpProject(slug: {eq: $slug}) {
        id
        title
        content
        whatilearned
    }
  } 
`

