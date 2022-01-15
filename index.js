import * as prismic from "@prismicio/client"
import {getInput,setOutput} from "@actions/core"
import fetch from "node-fetch";

let has = (s,c)=> s.indexOf(c) >= 0

async function queryPrismicAPI(){
  let accessToken = getInput('ACCESS_TOKEN')
  let endPoint = getInput('END_POINT')
  let type = getInput('TYPE')
  let client = getPrismicClient(endPoint,accessToken)
  let fields = getFieldsKeyAndPath(getInput('FIELDS'))
  let data = null

  if(type){
    let res = await client.getAllByType(type)
    data = res ? buildArrayFromFields(res,fields) : []
  }

  setOutput('DATA', JSON.stringify(data));
}

function buildArrayFromFields(data,fields){
  return data.map(dataItem => {
    return fields.reduce((obj,field) => {
      let value = getValueFromPath(field.path,dataItem)
      if (value) obj[field.key] = value
      return obj
    },{})
  })
}

function getValueFromPath(path,data){
  if (!has(path,".")) return data[path] || null
  return path.split('.').reduce((obj,key) => obj ? obj[key] : null,data)
}


function getFieldsKeyAndPath(fields){
  if (!fields) return []

  let fieldsArr = has(fields,",") ? fields.split(",") : [fields]

  return fieldsArr.map(field => {
    if(has(field,":")){
      let parts = field.split(':')
      return {key: parts[0], path: parts[1]}
    }
    if (has(field,".")){
      let parts = f.split(".")
      return {key:parts[parts.length - 1],path: field }
    }
    return {key: field,path: field}
  })
}

function getPrismicClient(endPoint,accessToken){
  return prismic.createClient(endPoint,{
    accessToken,
    fetch: async (url,options)=>{
      const res = await fetch(url,options)
      if (res.ok) return res
    }
  })
}

queryPrismicAPI()
