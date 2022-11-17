import { Popconfirm, Table, Tag, Form} from 'antd';
import React, {useState}from 'react'
import {CustomizedModal} from '../components/customized-modal'

const apiURL = process.env.REACT_APP_API_URL;

export const List = (props) => {

  const {datas, setDatas} = props;
  const [currentId, setCurrentId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  let handleEdit = (id) => {
    setIsModalOpen(true);
    setCurrentId(id);
    let targetArr = datas.filter((item) => {
      return item.id === id;
    })
    let target = targetArr[0];
    form.setFieldsValue({...target})
  }
  let handleDeletion = (id) => {
    if (datas.length >= 1) {
      fetch(`${apiURL}/datas/${id}`, {
        method:'DELETE'
      }).then(async response => {
        if (response.ok) {
          alert('删除成功');
        }
      })
      let newDatas = datas.filter((item)=>{
        return item.id !== id;
      })
      setDatas(newDatas);
    }
  }
  let handleOk = () => {
    let newItem = form.getFieldsValue();
    newItem.id = currentId;
    let newDatas = [];
    for (let i = 0; i < datas.length; i++) {
      if (datas[i].id === currentId) {
        newDatas.push(newItem);
      } else {
        newDatas.push({...datas[i]});
      }
    }
    setDatas([...newDatas]);
    setIsModalOpen(false);
    fetch(`${apiURL}/datas/${currentId}`, {
      method:'PATCH',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(newItem)
    }).then(async response => {
      if (response.ok) {
        alert('成功');
      }
    })
  }

  let handleCancel = (id) => {
    setIsModalOpen(false);
  }
  const columns = [
    {
      title:'id',
      dataIndex:'id',
    },
    {
      title:'名称',
      dataIndex:'name',
    },
    {
      title:'状态',
      dataIndex:'status',
      render:(status)=>{
        let color = status === "active" ? 'green' : 'red';
        let text = status === "active" ? '启用' : '禁用'
        return (
          <Tag color={color}>{text}</Tag>
        )
      }
    },
    {
      title:'数据',
      dataIndex:'data',
    },
    {
      title:'操作',
      dataIndex: 'operation',
      render:(_,record) => {
       return (
        <>
          <a onClick={()=> handleEdit(record.id)}>编辑</a>&nbsp;
          <CustomizedModal form={form} datas={datas} setDatas={setDatas} handleOk={handleOk} handleCancel={handleCancel} isModalOpen={isModalOpen} currentId={currentId}/>
          <Popconfirm title='确认删除?' onConfirm={()=> handleDeletion(record.id)} cancelText="取消" okText="确认">
            <a>删除</a>
          </Popconfirm>
        </>
       )
      }
    }

  ]
  return (
    <>
      <Table bordered dataSource={datas} columns={columns} rowKey={(record)=>record.id} pagination={false}></Table>
    </>
  )
}

