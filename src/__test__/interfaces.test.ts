import {faker} from "@faker-js/faker";

const {ApolloServer, gql} = require("apollo-server");
const {createTestClient} = require("apollo-server-testing");
import {validateUserInfo} from "../utils/validations/user";
import {config} from "../configServer";

const server = new ApolloServer(config);
const {query, mutate} = createTestClient(server);
describe('Validations', () => {
    it('Validate User token information', async () => {
        const userInfo = {
            user: {
                sub: faker.internet.domainName(),
                given_name: faker.name.fullName(),
                name: faker.name.fullName(),
                email: faker.internet.email(),
            }
        }
        const res = validateUserInfo(userInfo)
        expect(res).toBe(userInfo.user.email)
    });
    it('Validate Apollo Status', async () => {
        const FIND_STATUS = gql`
            query {
                getAvailableStatus {
                    id
                    description
                }
            }

        `;

        const {data} = await query({query: FIND_STATUS});
        const expectedResult = {
            getAvailableStatus: expect.any(Array)
        };
        const expectedObject = {
            description: expect.any(String),
            id: expect.any(String)
        };


        expect(data).toMatchObject(expectedResult);
        expect(data.getAvailableStatus[0]).toMatchObject(expectedObject);
    });
});