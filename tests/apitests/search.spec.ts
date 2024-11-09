import { request } from "http";
import { Browserstack, expect, test } from "../../src/base/fixture";

test('Creating POST search api request @searchapi', async({request})=>{
//creating a POST request
const postAPIResponse = await request.post('/search',{
    data :{
      difficulties : [],
durations : [],
enrolledOnly : false,
keys : [],
page : 0,
pageSize : 24,
schools : [],
searchText: "Testing",
semanticTypes: [],
skills: ["taxonomy:4c61e76f-1bc5-4088-97ee-9e4756fafece"],
sortBy: "relevance"
    },
   })
   const postAPIResponseBody = await postAPIResponse.json();
   console.log(postAPIResponseBody);
})
