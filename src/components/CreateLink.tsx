import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router";
import { CREATE_LINK_MUTATION, FEED_QUERY } from "../queries";
import { Feed } from "../types";
import { getQueryVariables } from "../utils";

const CreateLink: React.FC = () => {
  const history = useHistory();
  const [formState, setFormState] = useState({
    description: "",
    url: "",
  });

  const variables = getQueryVariables();

  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      description: formState.description,
      url: formState.url,
    },
    update: (cache, { data: { post } }) => {
      const { feed }: any = cache.readQuery({
        query: FEED_QUERY,
        variables,
      })!;
      if (!feed) return;
      cache.writeQuery({
        query: FEED_QUERY,
        data: { feed: { links: feed ? [post, ...feed.links] : "" } },
        variables,
      });
    },
    onCompleted: () => history.push("/new/1"),
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createLink();
        }}
      >
        <div className="flex flex-column mt3">
          <input
            type="text"
            className="mb2"
            value={formState.description}
            onChange={(e) =>
              setFormState({
                ...formState,
                description: e.target.value,
              })
            }
            placeholder="A description for the link"
          />
          <input
            type="text"
            className="mb2"
            value={formState.url}
            onChange={(e) =>
              setFormState({
                ...formState,
                url: e.target.value,
              })
            }
            placeholder="The URL for the link"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateLink;
