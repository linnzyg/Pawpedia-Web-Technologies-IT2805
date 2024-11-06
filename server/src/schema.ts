export const typeDefs = `#graphql

    type Breed {
        id: ID!
        name: String!
        description: String!
        image: String!
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
    type BreedConnection {
        edges: [BreedEdge!]!
        pageInfo: PageInfo!
        totalCount: Int!
    }
    type BreedEdge {
        cursor: String!
        node: Breed!
    }
    type PageInfo {
        hasNextPage: Boolean!
        hasPreviousPage: Boolean!
        startCursor: String
        endCursor: String
    }
    type Query {
        breed(id: ID!): Breed
        breeds(first: Int!, after: String, filterBySize: String): BreedConnection
    }
    type Mutation {
        addComment(comment: AddCommentInput): Comment
    }
    input AddCommentInput {
        breedId: ID!
        username: String
        comment: String!
        rating: Int!
    }
    `