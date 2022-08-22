import {Task} from "../interfaces/task.interface";
import {User} from "../interfaces/user.interface";
import {Status} from "../interfaces/status.interface";

export const mockTask: Task[] = [{
    id: "4fdc1b4c-24a4-48e2-82b2-df55c92098bb",
    name: "Mock task",
    description: "Mock description",
    user: "5453a389-2e45-40d5-8d49-d9290ba75873",
    status: "4bac1a4e-3cc8-4efc-8a71-03aac6cd2772",
    created_date: "2022-08-21T21:34:52-05:00",
    updated_date: "2022-08-21T21:34:52-05:00",
}]

export const mockUser: User[] = [{
    name: "Mock user",
    id: "5453a389-2e45-40d5-8d49-d9290ba75873",
    email: "mock@email.com",
    created_date: "2022-08-21T21:34:52-05:00",
    updated_date: "2022-08-21T21:34:52-05:00",
}]

export const mockStatus: Status[] = [
    {
        id: "4bac1a4e-3cc8-4efc-8a71-03aac6cd2772",
        description: "Mock status 1",
    },
    {
        id: "f33d6462-0b36-4e97-99d2-45c8d6a21420",
        description: "Mock status 2",
    }
]

export const testToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UbERRak14T1VZMlJqUTFPRUpGUVVZMk1ERkdRamcwT0RrMk56VXpSa05CUWtVeE1qUkRRZyJ9.eyJpc3MiOiJodHRwczovL3Bicm10ZXN0LmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwNjYyNTY0MTMwMTQxNjk1OTU1MCIsImF1ZCI6WyJodHRwczovL3VzLWNlbnRyYWwxLXRvZG9hcHAtZTBhZTUuY2xvdWRmdW5jdGlvbnMubmV0L3RvLWRvLWFwcCIsImh0dHBzOi8vcGJybXRlc3QuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY2MTE5MzA5OSwiZXhwIjoxNjYxMjc5NDk5LCJhenAiOiIweTFwcGd0ZHV1dTRoMUVocmRLSk1IazlLOVhKOUxsUSIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwifQ.jjeo7dCfI-2DJ2IZ5bdlFHcN-K_i9v1UGja_-62T_bsW2rkSd8NdIHY1X_Mlt-BtCBGygM3Vix38WHBHj2FfDzuwzfFepoUO0PE2t1JB0VamdjShISXtuBjw9cIsftjJrMNZhWVeAFLnRl5RnWpGVZgBNWy5z7Fdd2XpnsuJas9N73-zj5bmsXCHSoGoNxsAB7M9xLCqloKGoT61D35M7n-CvSufBjP9TBztkCTA9rzbt8b0wRdxQMvxEHyNABLPuzD8BC1n08QxmIP3izmUQBop-9BsyApV-KgIq-HGnXIDh42haMC4DvI1qiCTMpKO3oXanMr0kokBqYqf_6qsFw'