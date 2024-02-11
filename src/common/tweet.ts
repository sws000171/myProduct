import { Client,auth } from 'twitter-api-sdk';
//import { Token } from 'typescript';

export const tweet = async ()=>{

  // Initialize auth client first
  const authClient = new auth.OAuth2User({
    client_id: import.meta.env.VITE_CLIENT_ID,
    client_secret: import.meta.env.VITE_CLIENT_SECRET,
    callback: import.meta.env.CALLBACK,
    scopes: ["tweet.write", "offline.access", "tweet.read", "users.read"],
    token:import.meta.env.VITE_TOKEN,
  });
  const newToken = await authClient.refreshAccessToken();
  console.log(newToken);
};
