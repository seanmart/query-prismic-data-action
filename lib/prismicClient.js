import fetch from './fetch'

export default async function(endpoint,accessToken){
  let results = await fetch(`${endpoint}?access_token=${accessToken}`)
  if (results){
    let ref = results.refs[0].ref
    return {
      get: async function(q){
        q = encodeURIComponent(q)
        return await fetch(`${endpoint}/documents/search?ref=${ref}&access_token=${accessToken}&q=${q}`)
      }
    }
  }
}
