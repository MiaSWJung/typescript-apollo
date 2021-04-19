import {gql} from "@apollo/client";

// CreateLink
export const CREATE_LINK_MUTATION = gql`
  mutation PostMutation(
    $description: String!
    $url: String!
  ) {
    post(description: $description, url: $url){
      id
      createdAt
      url
      description
    }
  }
`

// Link
export const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        id
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

// LinkList
export const FEED_QUERY = gql`
  query {
    feed {
      id
      links {
        id
        createdAt
        description
        url
        postedBy {
          id
          name
        }
        votes {
          id
          user{
            id
          }
        }
      }
    }
  }
`

// Login
export const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $email: String!
    $password: String!
    $name: String!
  ) {
    signup(
      email: $email
      password: $password
      name: $name
    ) {
      token
    }
  }
`;


export const LOGIN_MUTATION = gql`
  mutation LoginMutation(
    $email: String!
    $password: String!
  ) {
    login(email: $email, password: $password) {
      token
    }
  }
`;