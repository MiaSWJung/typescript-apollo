import React, {useState} from "react";
import {useMutation, gql} from "@apollo/client";
import {useHistory} from "react-router";

const CREATE_LINK_MUTATION = gql`
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

const CreateLink : React.FC = ()=> {
  const history = useHistory();
  const [formState, setFormState] = useState({
    description:'',
    url:''
  });

  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables : {
      description : formState.description,
      url : formState.url
    }
  })

  return (
    <div>
      <form
        onSubmit={(e)=>{
          e.preventDefault();
          createLink();
        }}
      >
        <div className="flex flex-column mt3">
          <input
            type="text"
            className="mb2"
            value={formState.description}
            onChange={(e)=>
              setFormState({
                ...formState,
                description: e.target.value
              })
            }
            placeholder="A description for the link"
          />
          <input
            type="text"
            className="mb2"
            value={formState.url}
            onChange={(e)=>
              setFormState({
                ...formState,
                url: e.target.value
              })
            }
            placeholder='The URL for the link'
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default CreateLink