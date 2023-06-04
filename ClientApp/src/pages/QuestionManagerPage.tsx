import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, FormControl, IconButton, InputLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useAllQuestions } from '../hooks/useAllQuestions';
import { Question } from '../types/Question';

export default function QuestionManagerPage(): React.ReactElement {
    const {getAllQuestions,questions}=useAllQuestions();
    const [editModalIsOpen, seteditModalIsOpen] = useState(false);
    const [selectedQuestion,setSelectedQuestion]=useState<Question>();
    useEffect(()=>{
        getAllQuestions();
    },[]);
    return (
        <>
            <h1>
                Question Manager
            </h1>
            
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
                                            //openEditmodal(user);
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
        </>
    );
}