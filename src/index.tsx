import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
// Apollo Client 를 연결하는데 필요한 모든 종속성

import { setContext } from "@apollo/client/link/context";
// 이 미들웨어는 ApolloClient가 서버에 요청을 보낼 때마다 호출 됨
// localstorage에서 인증 토큰(이 있다면)을 얻고, context에 header를 리턴하면 httpLink가 그것을 읽는다.

import { split } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
// 위 세 미들웨어는 아폴로 클라이언트 인스턴스가 서버구독에 대해 알도록 하는.
// we need to configure ApolloClient with info about subscription endpoint.

import { AUTH_TOKEN } from "./constants";
import { FragmentDefinitionNode, OperationTypeNode } from "graphql";
import { Definition } from "./types";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});
// ApolloClient 인스턴스와 GraphQL API을 연결하는 link
// GraphQL server 는 4000 포트에서 running 하게 됨

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
    connectionParams: { authToken: localStorage.getItem(AUTH_TOKEN) },
  },
}); // 구독 엔드포인트 info를 알고있는 웹소켓 링크 생성

const link = split(
  ({ query }) => {
    // const { kind, operation }: Definition = getMainDefinition(query);
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
); // split : 요청을 특정 미들웨어 링크로 라우팅 하는데 사용
// 인수 3 : { test : 요청 작업이 subscription 인지 확인 (bool) , test가 true 일 때 전달되는 링크 , test가 false 일 때 전달되는 링크 }

const client = new ApolloClient({
  link,
  // cache: new InMemoryCache(),
  cache: new InMemoryCache({
    typePolicies: {
      Feed: {
        fields: {
          links: {
            merge(e = [], i: any[]) {
              return [...e, ...i];
            },
          },
        },
      },
    },
  }),
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
// HOC 인 ApolloProvider로 감싸서 client를 prop으로 전달

serviceWorker.unregister();
