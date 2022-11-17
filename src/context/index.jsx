import React, {useContext}  from "react"

export const publicContext = React.createContext({
  datas:[],
  setDatas:null,
  currentId:null,
  form:null
});