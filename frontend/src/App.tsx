import React from 'react';
import './App.css';

import {gql, useQuery} from '@apollo/client'
import _Form from "./Form/_Form";

const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      description
    }
  }
`;

function Posts() {
  const { loading, error, data } = useQuery(GET_POSTS);

  if(loading) return 'Loading...';
  if(error) return `Error! ${error.message}`

  const list = data.posts.map((post: any) =>
    <div key={post.id} className={"Card"}>
      <h3>{post.title}</h3>
      <p>{post.description}</p>
    </div>
  );

  return (
    <div>
      {list}
    </div>
  );
}

function createPost(author: string, title: string, description: string, body: string) {
  const CREATE_POST = gql`
mutation {
  createPost(input: {
    authorId: "${author}"
    title:"${title}"
    description:"${description}"
    body:"${body}"
    slug:"${(title + description)}"
  }) {
  id
}
}
`;

  // @ts-ignore
  console.log(CREATE_POST.loc.source.body);

}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <_Form/>
        {Posts()}
      </header>
    </div>
  );
}

export default App;
