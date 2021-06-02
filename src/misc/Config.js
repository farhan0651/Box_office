// fetch("https://chaturbate.com/api/public/affiliates/onlinerooms/?wm=3rays&gender=f&client_ip=request_ip").then((res)=>{
// return(res.json());
// }).then((res2)=>{console.log(res2.results[0])});


const API_BASE_URL='https://api.tvmaze.com'

export async function apiGET(queryString){
 const response=await fetch(`${API_BASE_URL}${queryString}`).then(result=>result.json())
    return response;
}