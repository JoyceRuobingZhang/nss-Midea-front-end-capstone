import React, {useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import { CommentContext } from './CommentProvider'
import { CommentResponseContext } from './CommentResponseProvider'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'semantic-ui-css/semantic.min.css'
import './PostDetail.css'

export const CommentList = (props) => {

    const { comments, getComments, addComment, deleteComment, openReplyInput, closeReplyInput } = useContext(CommentContext)
    const { commentResponses, getCommentResponses, addCommentResponse, deleteCommentResponse } = useContext(CommentResponseContext)

    useEffect(() => {getComments()}, [])
    useEffect(() => {getCommentResponses()}, [])


    const history= useHistory()
    const currentUserId = sessionStorage.getItem("midea_user")
    const MySwal = withReactContent(Swal)

    const [comment, setComment] = useState({
        content: ""
    })
    const [commentResponse, setCommentResponse] = useState({
        content: ""
    })

    // add a comment
    const handleCommentInputChange = e => {
        const newComment = {...comment}
        newComment[e.target.id] = e.target.value
        setComment(newComment)
    }
   
    const handleComment = e => {
        e.preventDefault()

        const commentObj = {
            postId: props.postId,
            userId: parseInt(currentUserId) ,
            time: Date(Date.now()).slice(0,24),
            content: comment.content,
            replyInput: false
        }

        if(comment.content !== ""){
            addComment(commentObj).then(() => {
                setComment({content: ""})
                history.push(`/post/detail/${props.postId}`)
            })
        } else {
            MySwal.fire({ didOpen: () => {
                // `MySwal` is a subclass of `Swal`
                //   with all the same instance & static methods
                MySwal.clickConfirm()
            }}).then(() => { return MySwal.fire(<p> Please write something!</p>) })
        }
    }

    // add a comment response
    const handleCommentResponseInputChange = e => {
        const newCommentResponse = {...commentResponse}
        newCommentResponse[e.target.id] = e.target.value
        setCommentResponse(newCommentResponse)
    }

    const handleCommentResponse = (commentId) => {
        const commentResponseObj = {
            commentId: commentId,
            userId: parseInt(currentUserId) ,
            time: Date(Date.now()).slice(0,24),
            content: commentResponse.content
        }

        if(commentResponse.content !== ""){
            addCommentResponse(commentResponseObj).then(() => {
                setCommentResponse({content: ""})
                history.push(`/post/detail/${props.postId}`)
            })
        } else {
            MySwal.fire({ didOpen: () => {
                // `MySwal` is a subclass of `Swal`
                //   with all the same instance & static methods
                MySwal.clickConfirm()
            }}).then(() => { return MySwal.fire(<p> Please write something!</p>) })
        }
    }

    const handleDeleteComment = (commentId) => {
        deleteComment(commentId).then(() => history.push(`/post/detail/${props.postId}`))
    }

    const handleDeleteCommentResponse = (commentResponseId) => {
        deleteCommentResponse(commentResponseId).then(() => history.push(`/post/detail/${props.postId}`))
    }


    return (
        <Comment.Group threaded>
            <Header as='h3' dividing>
            Comments
            </Header>

            {
            comments.some(comment => comment.postId === props.postId) ?
            comments.filter(comment => comment.postId === props.postId).
            map(comment => {
                return (
                    <>
                    <Comment>
                        <Comment.Avatar as='a' src={comment.user.profileURL} />
                        <Comment.Content>
                        <Comment.Author as='a'>{comment.user.name}</Comment.Author>
                        <Comment.Metadata>
                        <span>{comment.time}</span>
                        </Comment.Metadata>
                        <Comment.Text>
                            <p>{comment.content}</p>
                        </Comment.Text>
                        <Comment.Actions>
                            {
                            comment.user.id == currentUserId?
                            <button className="reply delete" onClick={() => handleDeleteComment(comment.id)}>Delete</button> :
                            ""
                            }

                            <button className="reply" id={comment.id} key={comment.id} onClick={() => openReplyInput(comment.id).then(() => handleCommentResponse)}>Reply</button>
                            {
                                comment.replyInput?
                                <div>
                                <input id="content"  value={commentResponse.content} onChange={handleCommentResponseInputChange}  placeholder={`reply to ${comment.user.name}...`}  required autoFocus />
                                <button className="add_reply" onClick={() => handleCommentResponse(comment.id)}> Add </button>
                                <button className="add_reply" onClick={() => closeReplyInput(comment.id)}>Close</button>
                                </div> :
                                ""
                            }
                        </Comment.Actions>
                    </Comment.Content>
                   
                    {
                        commentResponses.some(commentResponse => commentResponse.commentId === comment.id)?
                        commentResponses.filter(commentResponse => commentResponse.commentId === comment.id).map(
                            commentResponse => {return (
                                <Comment.Group>
                                <Comment>
                                <Comment.Avatar as='a' src={commentResponse.user.profileURL}/>
                                <Comment.Content>
                                    <Comment.Author as='a'>{commentResponse.user.name}</Comment.Author>
                                    <Comment.Metadata>
                                    <span>{commentResponse.time}</span>
                                    </Comment.Metadata>
                                    <Comment.Text>{commentResponse.content}</Comment.Text>
                                    <Comment.Actions>
                                    {
                                    commentResponse.user.id === parseInt(currentUserId) ?
                                    <button className="reply delete" onClick={() => handleDeleteCommentResponse(commentResponse.id)}>Delete</button> :
                                    ""
                                    }
                                    </Comment.Actions>
                                </Comment.Content>
                                </Comment>
                            </Comment.Group>
                            )}
                        ):
                        ""
                    }
                     </Comment>
                    </>
                )
            }) :
            <h4>Be the first one to leave a comment!</h4>   
            }     

            <Form reply>
                 <Form.TextArea id="content"  value={comment.content} onChange={handleCommentInputChange}  placeholder="write a comment..."  required autoFocus />
                 <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={handleComment} />
            </Form> 
 
        </Comment.Group> 
        )
}

