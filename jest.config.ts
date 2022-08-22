import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
    verbose: true,
    "transform": {
        '^.+\\.ts?$': 'ts-jest',
        "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest",
    },


    "transformIgnorePatterns": [
        "node_modules/(?!variables/.*)"
    ]
};
export default config;

