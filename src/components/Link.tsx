import { useMutation, gql } from "@apollo/client";
import React from "react";
import { AUTH_TOKEN, LINKS_PER_PAGE } from "../constants";
import { getQueryVariables, timeDifferenceForDate } from "../utils";
import { LinkProps, FeedLink, Feed } from "../types";
import { VOTE_MUTATION, FEED_QUERY } from "../queries";

const Link: React.FC<LinkProps> = (props) => {
  const { link } = props;
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const variables = getQueryVariables();

  const [vote] = useMutation(VOTE_MUTATION, {
    variables: { linkId: link.id },
    update(cache, { data: { vote } }) {
      const { feed }: any = cache.readQuery({
        query: FEED_QUERY,
        variables,
      })!;
      const updatedLinks = feed.links.map((feedLink: FeedLink) => {
        if (feedLink.id === link.id) {
          return {
            ...feedLink,
            votes: [...feedLink.votes, vote],
          };
        }
        return feedLink;
      });

      cache.writeQuery({
        query: FEED_QUERY,
        data: { feed: { links: updatedLinks } },
        variables,
      });
    },
  });

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{props.index + 1} . </span>
        {authToken && (
          <div
            className="ml1 gray f11"
            style={{ cursor: "pointer" }}
            onClick={() => {
              vote();
            }}
          >
            ▲
          </div>
        )}
      </div>
      <div className="ml1">
        <div>
          {link.description} ({link.url})
        </div>
        {authToken && (
          <div className="f6 lh-copy gray">
            {link.votes.length} vote | by{" "}
            {link.postedBy ? link.postedBy.name : "Unknown"}{" "}
            {timeDifferenceForDate(link.createdAt)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Link;
