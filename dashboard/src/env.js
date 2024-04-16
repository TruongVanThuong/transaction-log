export default function AuthUser(){
  const endpointAdmin = "http://localhost:8001/api/Admin";
  const endpointApi = "http://localhost:8001/api";
  const endpoint = "http://localhost:8001";
 
  
  return { endpoint, endpointApi, endpointAdmin };
}