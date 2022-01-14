import * as prismic from "@prismicio/client"
import {getInput,setOutput} from "@actions/core"
import fetch from "node-fetch";

async function queryPrismicAPI(){

  let accessToken = getInput('ACCESS_TOKEN')
  let endPoint = getInput('END_POINT')
  let type = getInput('TYPE')
  let client = getClient(endPoint,accessToken)
  let fields = getFields(getInput('FIELDS'))
  let res = null
  let arr = []
  let data = []

  if(type) res = await client.getAllByType(type)

  if (res){
    arr = Array.isArray(res) ? res : [res]
    arr.forEach(a => data.push(fields ? getDataFields(a,fields) : a))
  }

  let output = data.length == 1 ? data[0] : data
  setOutput('DATA', output);

}

function has(s,c){
  return s.indexOf(c) >= 0
}

function getDataFields(data,fields){
  // fields will be an array of {key,value}
  let getNestedValue = (v) => v.split('.').reduce((o,i)=> o[i],data)

  let obj = {}
  fields.forEach(f => {
    obj[f.key] = has(f.value,".") ? getNestedValue(f.value) : d[f.value]
  })

  return obj
}

function getFields(d){
  if(!d) return null
  // example "id:uid,name:data.name"

  let getFieldAndKey = (s)=>{
    let a = s.split(':')
    return {key:a[0],field:a[1]}
  }

  let fields = has(d,",") ? d.split(",") : [d]

  return fields.map(f => {
    let key = null
    let value = f

    if(has(f,":")){
      let a = f.split(':')
      key = a[0]
      value = a[1]
    } else if(has(f,".")) {
      let a = f.split(".")
      key = a[a.length - 1]
    } else {
      key = f
    }

    return {key,value}

  })

}

function getClient(endPoint,accessToken){
  return prismic.createClient(endPoint,{
    accessToken,
    fetch: async (url,options)=>{
      const res = await fetch(url,options)
      if (res.ok) return res
    }
  })
}

queryPrismicAPI()
