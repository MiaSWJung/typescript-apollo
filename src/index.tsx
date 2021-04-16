import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from "@apollo/client";
// Apollo Client 를 연결하는데 필요한 모든 종속성

import {setContext} from "@apollo/client/link/context";
// 이 미들웨어는 ApolloClient가 서버에 요청을 보낼 때마다 호출 됨
// localstorage에서 인증 토큰(이 있다면)을 얻고, context에 header를 리턴하면 httpLink가 그것을 읽는다.

import {AUTH_TOKEN} from "./constants";



const authLink = setContext((_,{headers}) =>{
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers : {
      ...headers,
      authorization : token ? `Bearer ${token}` : ''
    }
  }
})

const httpLink = createHttpLink({
  uri : 'http://localhost:4000'
})
// ApolloClient 인스턴스와 GraphQL API을 연결하는 link
// GraphQL server 는 4000 포트에서 running 하게 됨

const client = new ApolloClient({
  link : authLink.concat(httpLink),
  cache : new InMemoryCache()
})

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
// HOC 인 ApolloProvider로 감싸서 client를 prop으로 전달

serviceWorker.unregister();

