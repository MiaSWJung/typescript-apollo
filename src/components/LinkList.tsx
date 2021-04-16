import React from "react";
import Link from './Link';
import {useQuery, gql} from "@apollo/client";

const FEED_QUERY = gql`
  query {
    feed {
      id
      links {
        id
        createdAt
        description
        url
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
          {data.feed.links.map((link:any) =>(
            <Link key={link.id} link={link} />
          ))}
        </>
      )}
    </div>
  );
};

export default LinkList;
