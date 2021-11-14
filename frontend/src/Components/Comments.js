import { Comment, Avatar, Form, Button, List, Input, Empty } from 'antd';
import {
  Grid,
  Typography,
  TextField,
  Modal,
  makeStyles,
  Paper
} from '@material-ui/core'
import moment from 'moment';
import { useEffect, useState } from 'react';
import "antd/dist/antd.css";
import stockService from '../services/stock-service';
import commentService from '../services/comment-service';

const { TextArea } = Input;
const styles = makeStyles(theme => ({
  msgModal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  msgContent: {
    paddingLeft:"2%",
    paddingRight:"2%",
    height: '20%',
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    border: '2px solid #000',
  },
}))

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
  const classes = styles();
  const [commentsList, setCommentsList] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');
  const [editValue, seteditValue] = useState('');
  const [editMid, setEditMid] = useState('')
  const [openModel, setOpenModel] = useState(false)
  const userData = JSON.parse(localStorage.getItem('user'))

  const handleEdit = (mid) => {
    setOpenModel(true)
    setEditMid(mid)
    console.log(editMid)
  }
  const handleDelete = (mid) => {
    commentService.deleteCommit(mid).then( res=>{console.log(res);setSubmitting(!submitting)})
  }
  const actions = (uid, userData, mid) => {
    if (userData) {
      if (JSON.parse(localStorage.getItem('user')).data.uid === uid) {
        return [<span onClick={() => handleEdit(mid)}>Edit</span>, <span onClick={() => handleDelete(mid)}>Delete</span>]
      }
    }
    return null
  }

  const CommentList = ({ comments, userData }) => (
    <List
      dataSource={comments}
      renderItem={item => (
        <li>
          <Comment
            actions={actions(item.uid, userData, item.mid)}
            author={item.userName}
            avatar={"https://joeschmoe.io/api/v1/" + item.uid}
            content={item.msg}
          // datetime={item.createTime}
          />
        </li>
      )}
      pagination={{
        size: "small",
        pageSize: 2,

      }}
    />
  );

  useEffect(() => {

    stockService.getStockCommentsById(sid)
      .then(res => {
        if (res.data.data) {
          setCommentsList(res.data.data)
        }
      })
      .catch(err => console.log(err))

  }, [submitting,sid])


  const handleSubmit = () => {
    if (!value) {
      return;
    }
    setSubmitting(true);
    commentService.pushComment(sid, value).then(res => console.log(res.data.data.mid))

      setSubmitting(!submitting);
      setValue('');
  };

  const handleChange = e => {
    setValue(e.target.value);
  };

  
  const submitEdit=(editMid)=>{
    if (!editValue){
      return 
    }

    commentService.editCommit(editMid,editValue).then( res=>{console.log(res);setSubmitting(!submitting)})

    setOpenModel(false)
  }


  
  return (
    <>


      <Modal
        open={openModel}
        onClose={() => setOpenModel(false)}
        className={classes.msgModal}
      >
        <Paper className={classes.msgContent} >
          <TextField
            label='Edit your comment'
            required
            placeholder='Input'
            fullWidth
            onChange={(e)=>seteditValue(e.target.value)}
          />
          <Button type="primary" onClick={()=>submitEdit(editMid)}>
            <div style={{ fontFamily: 'Bungee', fontSize: '0.5rem' }}>
              Edit
            </div>
          </Button>
        </Paper>
      </Modal>
      {
        commentsList.length > 0
          ? <CommentList comments={commentsList} userData={userData} />
          : <Empty description='No comments' />
      }
      {
        userData
          ? <Comment
            avatar={<Avatar src={"https://joeschmoe.io/api/v1/" + JSON.parse(localStorage.getItem('user')).data.uid} alt={JSON.parse(localStorage.getItem('user')).data.uid} />}
            content={<Editor
              onChange={handleChange}
              onSubmit={handleSubmit}
              // submitting={submitting}
              value={value} />
            } />
          : null




      }

    </>
  );

}

export default Comments