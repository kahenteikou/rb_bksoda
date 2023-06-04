import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, FormControl, IconButton, InputLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField ,Tabs,Tab} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useAllQuestions } from '../hooks/useAllQuestions';
import { Question } from '../types/Question';
import { Question_Req } from '../types/Question_Req';

export default function QuestionManagerPage(): React.ReactElement {
    const {getAllQuestions,questions}=useAllQuestions();
    const [editModalIsOpen, seteditModalIsOpen] = useState(false);
    const [selectedQuestion,setSelectedQuestion]=useState<Question>();
    const [tabIndex,setTabIndex]=useState(0);
    const tab_HandleChange=(event: React.SyntheticEvent, newValue: number)=>{
        setTabIndex(newValue);
    };
    useEffect(()=>{
        getAllQuestions();
    },[]);
    const closeEditModal = () => {
        seteditModalIsOpen(false);
    };
    const openEditModal=(question:Question)=>{
        setSelectedQuestion(question);
        seteditModalIsOpen(true);
    };
    function post_edited_value_and_refresh() {
        //console.log("after log:",selectedUser);
        let request_question: Question_Req = {
            question_name: selectedQuestion?.question_name,
            content: selectedQuestion?.content,
            answer: selectedQuestion?.answer
        };
        console.log("after log:", request_question);
        fetch(
            "http://localhost:8080/api/v1/question_db/question/" + selectedQuestion?.uuid,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(request_question)
            }
        ).then((rp) => {
            getAllQuestions();
        }, (err) => {
            console.error(err)
        });
        closeEditModal();
    }
    return (
        <>
            <h1>
                Question Manager
            </h1>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabIndex} onChange={tab_HandleChange} aria-label='tab'>

                    </Tabs>
                </Box>
            </Box>
            <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Name
                                </TableCell>
                                <TableCell align="right">
                                    Content
                                </TableCell>
                                <TableCell align="right">
                                    Answer
                                </TableCell>
                                <TableCell align="right">
                                    UUID
                                </TableCell>
                                <TableCell align="right">
                                    Edit
                                </TableCell>
                                <TableCell align="right">
                                    Delete
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {questions.map((question) => (
                                <TableRow key={question.uuid}>
                                    <TableCell component="th" scope="row">
                                        {question.question_name}
                                    </TableCell>
                                    <TableCell align="right">{question.content}</TableCell>
                                    <TableCell align="right">{question.answer}</TableCell>
                                    <TableCell align="right">{question.uuid}</TableCell>
                                    <TableCell align="right">
                                        <IconButton aria-label="edit" onClick={() => {
                                            console.log("edit: %s", question.uuid);
                                            openEditModal(question);
                                        }}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton aria-label="delete" onClick={() => {
                                            console.log("delete: %s", question.uuid);
                                            //openEditmodal(user);
                                            //openDeletemodal(user);
                                        }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog open={editModalIsOpen} onClose={closeEditModal}>
                    <DialogTitle>Question編集</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Question編集機能です。あああああああああああああああああああああああああああああああああああああああああ
                            <br />
                            {selectedQuestion?.uuid}
                        </DialogContentText>
                        <TextField margin="dense" label="問題名" fullWidth variant='standard' value={selectedQuestion?.question_name}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                                setSelectedQuestion({ ...selectedQuestion, question_name: e.target.value })
                            }} />
                        <TextField margin="dense" label="問い" fullWidth variant='standard' value={selectedQuestion?.content}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                                setSelectedQuestion({ ...selectedQuestion, content: e.target.value })
                            }} />
                        <TextField margin="dense" label="答え" fullWidth variant='standard' value={selectedQuestion?.answer}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                                setSelectedQuestion({ ...selectedQuestion, answer: e.target.value })
                            }} />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeEditModal}>Cancel</Button>
                        <Button onClick={post_edited_value_and_refresh}>Apply</Button>
                    </DialogActions>
                </Dialog>
        </>
    );
}