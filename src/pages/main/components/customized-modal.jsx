import React, {useState} from 'react'
import {Modal, Input, Radio, Form} from 'antd';

const apiURL = process.env.REACT_APP_API_URL;

export const CustomizedModal = (props) => {

  const {form, datas, currentId, setDatas, isModalOpen, setIsModalOpen, handleOk, handleCancel} = props;

  return (
  <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
    <Form style={{marginTop:"45px"}} form={form}>
      <Form.Item label="名称" name="name" rules={[{required:true, message:'请输入名称'}]}>
        <Input style={{width:"350px"}}/>
      </Form.Item>
      <Form.Item label="状态" name="status" rules={[{required:true, message:'请选择状态'}]}>
        <Radio.Group>
          <Radio value="active">启用</Radio>
          <Radio value="forbid">禁用</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="数据" name="data" rules={[{required:true, message:'请输入数据'}]}>
        <Input style={{width:"350px"}}/>
      </Form.Item>
    </Form>
  </Modal>
)
}