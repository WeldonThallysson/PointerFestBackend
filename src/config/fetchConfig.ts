

interface IAPI {
    baseURL?: string, 
    data?: string 
    method: string, 
    endpoint: string, 
    authorization: string
}

export const api = async ({baseURL, method, endpoint,data}: IAPI) => {
  let response = await fetch(`${baseURL ?? process.env.PAGBANK_URL}${endpoint}`, {
    method: method ?? "post",
    headers: {
        "Content-Type": "application/json",
        "Authorization": process.env.P
    },
    body: data ?? null
  })

  return response.json()
}