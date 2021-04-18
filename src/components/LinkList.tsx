import React from "react";
import Link from './Link';
import {useQuery, gql} from "@apollo/client";

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

const LinkList : React.FC = () => {
  const {data} = useQuery(FEED_QUERY);

  return (
    <div>
      {data && (
        <>
          {data.feed.links.map((link:any, index:number) =>(
            <Link key={link.id} link={link} index={index} />
          ))}
        </>
      )}
    </div>
  );
};

export default LinkList;
