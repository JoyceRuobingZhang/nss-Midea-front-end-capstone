import React, {useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import { CommentContext } from './CommentProvider'
import { CommentResponseContext } from './CommentResponseProvider'
import 'semantic-ui-css/semantic.min.css'
import './PostDetail.css'

export const CommentList = (props) => {

    const { comments, getComments } = useContext(CommentContext)
    const { commentResponses, getCommentResponses } = useContext(CommentResponseContext)

    useEffect(() => {getComments()}, [])
    useEffect(() => {getCommentResponses()}, [])


    return (
        <Comment.Group threaded>
            <Header as='h3' dividing>
            Comments
            </Header>

            {
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
                        <a>Reply</a>
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
                                    <span>Just now</span>
                                    </Comment.Metadata>
                                    <Comment.Text>{commentResponse.content}</Comment.Text>
                                    <Comment.Actions>
                                    <a>Reply</a>
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
            })
            }

            <Form reply>
            <Form.TextArea />
            <Button content='Add Comments' labelPosition='left' icon='edit' primary />
            </Form>

        </Comment.Group> 
        )
}

