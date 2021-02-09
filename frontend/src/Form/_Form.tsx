import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client"
import {randomInt} from "crypto";

/*
class UserDropdown extends React.Component {
  render() {
    const {loading, error, data} = useQuery(gql`
            {
              users {
                id
                username
              }
            }
          `);

    let options: JSX.Element;
    if (loading) options = <option value="&null">Loading...</option>;
    else if (error) options = <option value="&null">Error</option>;
    else options = data.users.map((user: any) =>
        <option value={user.id}>{user.username}</option>);

    return (
      <select id="user" name="user">

      </select>
    )
  }
}
*/

function Form(props: any) {
  const values = new Map<string, string>();
  let handleInputChange = (event: any) => {
    values.set(event.target.id, event.target.value);
  }

  const {loading, error, data} = useQuery(gql`
            {
              users {
                id
                username
              }
            }
          `);



  let userOptions;
  if(loading) userOptions = <option value="">Loading...</option>
  else if (error) userOptions = <option value="">Error: {error.message}</option>
  else userOptions = data.users.map((user: any) =>
    <option key={user.id} value={user.id}>{user.username}</option>
  )

  let useSubmit = (event: any) => {
    event.preventDefault();
    const query = `mutation {
  createPost(input: {
    authorId: "${values.get('author_id')}"
    title:"${values.get('title')}"
    description:"${values.get('description')}"
    body:"${values.get('body')}"
    slug:"${values.get('title')}"
  }) {
    id
  }
}
    `;

    fetch('http://127.0.0.1:8080/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: query
    })
      .then(r => r.json())
      .then(data=>console.log('data returned:', data))


  }

  return(<form onSubmit={useSubmit}>
    <label htmlFor="title">Title:</label><br/>
    <input onChange={handleInputChange} required type="text" id="title"/><br/>
    <label htmlFor="description">Description:</label><br/>
    <input onChange={handleInputChange} required type="text" id="description"/><br/>
    <label htmlFor="body">Body:</label><br/>
    <textarea onChange={handleInputChange} required id="body"/><br/>
    <label htmlFor="author_id">User:</label><br/>
    <select onChange={handleInputChange} required id="author_id" name="author_id">
      {userOptions}
    </select>
    <button type="submit">Create Post</button>
  </form>);
}


export default Form;