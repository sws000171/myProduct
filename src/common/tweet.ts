//ボツ
//サーバーサイド(node.js)でないと実施できない。
//かつ、oauth2.0トークンの取得方法が不明。

import { Client,auth } from 'twitter-api-sdk';
//import { Token } from 'typescript';
import { Buffer } from 'buffer';

export const tweet = async ()=>{
  window.Buffer = Buffer;
  // Initialize auth client first
  const authClient = new auth.OAuth2User({
    client_id: import.meta.env.VITE_CLIENT_ID,
    client_secret: import.meta.env.VITE_CLIENT_SECRET,
    callback: import.meta.env.VITE_CALLBACK,
    scopes: ["tweet.write", "offline.access", "tweet.read", "users.read"],
    //token: import.meta.env.VITE_TOKEN,
    token:{"token_type":"bearer","access_token":"UTdnQllEenp2SzRpT3VONF9hVW1UZ2JrUmxVWnFlQTVtVW4zWTFvbTFnbXhEOjE3MDc2NjgwOTUxMDQ6MTowOmF0OjE","scope":"tweet.write users.read tweet.read offline.access","refresh_token":"MUo4RHN5RFZsUlZOTkd1S2ZLM2wzaktJX0hLNWVHcC05WVB5Y05tOG1CSzBmOjE3MDc2NjgwOTUxMDU6MTowOnJ0OjE"}
  });
  const client = new Client(authClient);
  client.tweets.createTweet({
    text: "hello twitter api!"
}).then(console.log).catch(console.log)
};
