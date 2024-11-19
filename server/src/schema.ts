export const typeDefs = `#graphql

    # Breed type represents a dog breed and its properties
    type Breed {
        id: ID!                   # Unique identifier for the breed
        name: String!             # Name of the breed
        description: String!      # Description of the breed
        image: String!            # Image of the breed
        slug: String!             # Slug for the breed, used for URLs
        size: String!             # Size category of the breed (e.g., Small, Medium, Large)
        comments: [Comment!]      # List of comments related to the breed
        weight: Int!
        height: Int!
        lifespan: Int!
        trainability: Int!
        friendliness: Int!
        allergy: Int!
        energy: Int!
        issues: String!

    }

    # Comment type represents a comment made on a specific breed
    type Comment {
        id: ID!                   # Unique identifier for the comment
        breedId: String!          # ID of the breed associated with the comment
        username: String          # Username of the person who made the comment
        comment: String!          # The comment text
        timestamp: String!        # Timestamp when the comment was made
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
        breeds(first: Int!, after: String, filterBySize: [String], searchByName: String, orderBy: String): BreedConnection # Fetch a list of breeds with pagination and optional filtering
    }

    # Mutation type defines the available mutations that can be performed
    type Mutation {
        addComment(comment: AddCommentInput): Comment  # Add a new comment to a specific breed
    }

    # Input type for adding a new comment
    input AddCommentInput {
        breedId: ID!            # ID of the breed associated with the comment
        username: String        # Username of the person adding the comment
        comment: String!        # The actual comment text
    }
`;
