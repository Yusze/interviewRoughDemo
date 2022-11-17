import React, { useEffect, useState } from 'react'
import { Button, Form } from 'antd';
import {List} from "./components/list"
import {CustomizedModal} from './components/customized-modal'

const apiURL = process.env.REACT_APP_API_URL;

export function Main() {

  const [datas, setDatas] = useState([]);


  useEffect(()=>{
    fetch(`${apiURL}/datas`).then(async response => {
      if (response.ok) {
        setDatas(await response.json());
      }
    })
  }, [])

  
  let handleAdditionOne = () => {

  }
  let handleAdditionTwo = () => {

  }
  let handleAdditionThree = () => {
    
  }
  let handleASC = () => {
    let newDatas = [...datas];
    newDatas.sort((a, b) => a.id - b.id);
    setDatas(newDatas);
  }
  let handleDES = () => {
    let newDatas = [...datas];
    newDatas.sort((a, b) => b.id - a.id);
    setDatas(newDatas);
  }

  return (
    <div className="box" style={{width:'80vw', display:'flex', flexDirection:'column', alignItems:'center', margin:'0 auto'}}>
      <div className="control-buttons">
        <Button type="primary" onClick={handleAdditionOne}>按钮1</Button>&nbsp;
        <Button type="primary" onClick={handleAdditionTwo}>按钮2</Button>&nbsp;
        <Button type="primary" onClick={handleAdditionThree}>按钮3</Button>&nbsp;
      </div>
      <div className="data-table">
        <Button type="link" onClick={handleASC}>升序</Button>/<Button type='link' onClick={handleDES}>降序</Button>
        <List datas={datas} setDatas={setDatas}></List>
        {/* <CustomizedModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/> */}
      </div>
    </div>
  )
}
