import * as prismic from "@prismicio/client"
import {getInput,setOutput} from "@actions/core"
import fetch from "node-fetch";

async function queryPrismicAPI(){
  let accessToken = getInput('ACCESS_TOKEN')
  let endPoint = getInput('END_POINT')
  let query = parseQuery(getInput('QUERY'))
  let fields = getFieldsKeyAndPath(getInput('FIELDS'))
  let client = getPrismicClient(endPoint,accessToken)
  let res = await client.get(query)
  console.log(query)
  console.log(res)
  let data = res ? buildArrayFromFields(res,fields) : []

  setOutput('DATA', JSON.stringify(data));
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

function parseQuery(query){
  if (!query) return ""
  let queryVars = query.match(/[^{\}]+(?=})/g)
  if (queryVars){
    queryVars.forEach(v => {
      let replaceStr = `{{${v}}}`
      let replaceVal = ""
      let props = v.split(',')
      let fn = props[0]
      let options = props.length == 2 ? props[1] : null
      switch(fn){
        case 'date':
        replaceVal = getDate(options)
        break
      }
      query = query.replace(replaceStr,replaceVal)
    })
  }
  return query
}

function getDate(options){
  let date = new Date()
  if (options) date.setDate(date.getDate() + parseInt(options))
  return formatDate(date)
}

function formatDate(date){
  let day = date.getDate().toString().padStart(2, '0')
  let month = (date.getMonth() + 1).toString().padStart(2, '0')
  let year = date.getFullYear()
  return `${year}-${month}-${day}`
}

function buildArrayFromFields(data,fields){
  if (fields.length == 0) return data
  return data.map(dataItem => {
    if (fields.length == 0) return dataItem
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
      let parts = field.split(".")
      return {key:parts[parts.length - 1],path: field }
    }
    return {key: field,path: field}
  })
}

function has(s,c){
  return s.indexOf(c) >= 0
}

queryPrismicAPI()
