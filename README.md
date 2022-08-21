# firebase-firestore-graphql

ToDo app [GraphQL](https://graphql.org/) setup with a Firebase Firestore backend. Uses [Apollo Engine](https://www.apollographql.com/) and deployed to Google App Engine.

## Initial setup

```bash
npm install
```

## Firebase setup

Download Firebase service account as `service-account.json` and put in root of this directory.
In your firestore database setup two collections, one of tweets and one of users. The userId in tweets should point to a user Id that the tweet came from.

```typescript
interface User {
  id: string;
  name: string;
  screenName: string;
  statusesCount: number;
}

interface Tweet {
  id: string;
  name: string;
  screenName: string;
  statusesCount: number;
  userId: string;
}
```

```bash
npm run serve
```

If you navigate to the URL you shoud be able to see a GraphQL playground where you can query your API, congrats!

## Apollo Engine

[Apollo Engine](https://www.apollographql.com/engine) gives use awesome features such as caching, tracing, and error logging. First get an [Apollo Engine API key](https://engine.apollographql.com/) then change your Apollo server config to turn on engine

```typescript
const server = new ApolloServer({
  typeDefs,
  resolvers,
  engine: {
    apiKey: "<APOLLO ENGINE API KEY HERE>"
  },
  introspection: true
});
```

Now when you npm serve and run some queries you should see some data populate the Apollo Engine dashboard with things like how fast your queries resolved. Cool!

## App Engine

Finally we can deploy to App engine so the world can access our GraphQL endpoint. In the root project folder create a file app.yaml. Inside is just one line

```yaml
runtime: nodejs8
```

Also add the .gcloudignore file from this repo to your folder. Setup the gcloud SDK then point it to your Firebase project.

```bash
gcloud config set project <projectID>
npm run build
gcloud app deploy
```

You should get a deployed URL, you can then query that using an GraphQL tool. I personally use [Insomnia’s GraphQL mode](https://support.insomnia.rest/article/61-graphql).

Congratulations, you've setup a GraphQL server!
