import {queryResolvers} from "./query.resolvers";
import {mutationResolvers} from "./mutations.resolver";

export const resolvers = {
    Query: queryResolvers,
    Mutation: mutationResolvers,
}