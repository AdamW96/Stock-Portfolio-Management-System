import { Comment, Avatar, Form, Button, List, Input, Empty } from 'antd';

import moment from 'moment';
import { useEffect, useState } from 'react';
import "antd/dist/antd.css";
import stockService from '../services/stock-service';
const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    renderItem={item => (
      <li>
        <Comment
          author={item.uid}
          avatar={"https://joeschmoe.io/api/v1/" + item.uid}
          content={item.msg}
          datetime={item.createTime}
        />
      </li>
    )}
    pagination={{
      size: "small",
      onChange: page => {
        console.log(page);
      },
      pageSize: 3,

    }}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={2} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button style={{ display: 'flex', alignItems: 'center' }} htmlType="submit" loading={submitting} onClick={onSubmit} type="primary" >
        <div style={{ fontFamily: 'Bungee', fontSize: '0.5rem' }}>
          Add Comment
        </div>
      </Button>
    </Form.Item>
  </>
);


const Comments = ({ sid }) => {
  const [commentsList, setCommentsList] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');


  useEffect(() => {

    stockService.getStockCommentsById(sid)
      .then(res => {
        if (res.data.data) {
          setCommentsList(res.data.data)
        }
      })
      .catch(err => console.log(err))

  }, [sid])


  const userData = JSON.parse(localStorage.getItem('user'))
  const cookie = userData ? userData.cookie : null
  console.log(userData, cookie)

  const handleSubmit = () => {
    if (!value) {
      return;
    }
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setValue('');
    }, 1000);
  };

  const handleChange = e => {
    setValue(e.target.value);
  };

  return (
    <>
      {
        commentsList.length > 0
          ? <CommentList comments={commentsList} />
          : <Empty  description='No comments'/>
      }
      {
        userData
          ? <Comment
            avatar={<Avatar src={"https://joeschmoe.io/api/v1/" + JSON.parse(localStorage.getItem('user')).data.userName} alt={JSON.parse(localStorage.getItem('user')).data.userName} />}
            content={<Editor
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitting={submitting}
              value={value} />
            } />
          : null




      }

    </>
  );

}

export default Comments