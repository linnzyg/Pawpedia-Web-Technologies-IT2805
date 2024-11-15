export const typeDefs = `#graphql

    # Breed type represents a dog breed and its properties
    type Breed {
        id: ID!
        name: String!
        description: String!
        image: String!
        slug: String!
        size: String!
        comments: [Comment!]
        averageRating: Float
    }

    # Comment type represents a comment made on a specific breed
    type Comment {

        id: ID!
        breedId: String!
        username: String
        comment: String!
        timestamp: String!
        rating: Int

    }

    # BreedConnection type supports pagination for the breeds
    type BreedConnection {
        edges: [BreedEdge!]!      # List of breed edges, used for pagination
        pageInfo: PageInfo!       # Information about pagination (e.g., cursors)
        totalCount: Int!          # Total number of breeds available
    }

    # BreedEdge type represents an edge in the pagination of breeds
    type BreedEdge {
        cursor: String!           # Cursor used for pagination
        node: Breed!              # The actual breed node
    }

    # PageInfo type provides details about pagination state
    type PageInfo {
        hasNextPage: Boolean!     # Indicates if there are more pages available
        hasPreviousPage: Boolean! # Indicates if there are previous pages available
        startCursor: String       # Cursor for the start of the current page
        endCursor: String         # Cursor for the end of the current page
    }

    # Query type defines the available queries that can be performed
    type Query {
        breed(id: ID!): Breed                          # Fetch a specific breed by its ID
        breeds(first: Int!, after: String, filterBySize: [String], searchByName: String): BreedConnection # Fetch a list of breeds with pagination and optional filtering
    }

    # Mutation type defines the available mutations that can be performed
    type Mutation {
        addComment(comment: AddCommentInput): Comment  # Add a new comment to a specific breed
    }

    # Input type for adding a new comment
    input AddCommentInput {

        breedId: ID!
        username: String
        comment: String!
        rating: Int

    }
    `
