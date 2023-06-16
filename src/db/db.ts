import { DB } from "..";


export const db: DB = {
  blogs: [
    {
      id: "0",
      name: "string",
      description: "string",
      websiteUrl: "string"
    },

    {
      id: "1",
      name: "string",
      description: "string",
      websiteUrl: "string"
    }
  ],
  posts: [    
    {
    id: "Leva",
    title: "First steps",
    shortDescription: "string",
    content: "string",
    blogId: "0",
    blogName: "string"
},

{
    id: "Platon",
    title: "First words",
    shortDescription: "string",
    content: "string",
    blogId: "1",
    blogName: "string"
}]
};
