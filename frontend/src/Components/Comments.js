import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import "antd/dist/antd.css";
const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
    pagination={{
      size:"small",
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
      <Button style={{display:'flex',alignItems:'center'}} htmlType="submit" loading={submitting} onClick={onSubmit} type="primary" >
        <div style={{fontFamily:'Bungee',fontSize:'0.5rem'}}>
          Add Comment
         </div>
      </Button>
    </Form.Item>
  </>
);

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');


  const handleSubmit = () => {
    if (!value) {
      return;
    }
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setValue('');
      setComments([
          ...comments,
          {
            author: 'Han Solo',
            avatar: 'https://joeschmoe.io/api/v1/Han Solo',
            content: <p>{value}</p>,
            datetime: moment().fromNow(),
          },
        ],
      )
    }, 1000);
  };

  const handleChange = e => {
    setValue(e.target.value);
  };

  return (
    <>
      {comments.length > 0 && <CommentList comments={comments} />}
      <Comment
        avatar={<Avatar src="https://joeschmoe.io/api/v1/Han Solo" alt="Han Solo" />}
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
    </>
  );

}

export default Comments