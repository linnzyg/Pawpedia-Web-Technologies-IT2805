export const typeDefs = `#graphql
    type ImageObject {
        filename: String!
        contentType: String!
        gridFSId: String!
    }
    type Breed {
        id: ID!
        name: String!
        description: String!
        image: ImageObject!
        slug: String!
        size: String!
        comments: [Comment!]
    }
    type Comment {
        id: ID!
        breedId: String!
        username: String
        comment: String!
        timestamp: String!
    }
    type Query {
        breeds: [Breed!]!
        breed(id: ID!): Breed
    }
    type Mutation {
        addComment(comment: AddCommentInput): Comment
    }
    input AddCommentInput {
        breedId: ID!
        username: String
        comment: String!
    }
    `