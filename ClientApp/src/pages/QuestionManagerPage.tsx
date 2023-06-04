import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, FormControl, IconButton, InputLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tabs, Tab, Stack, CssBaseline } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useAllQuestions } from '../hooks/useAllQuestions';
import { Question } from '../types/Question';
import { Question_Req } from '../types/Question_Req';

import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
const TabPanel=(props: TabPanelProps)=> {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index}
            id={`question-add-tabpanel-${index}`}
            aria-labelledby={`question-add-tab-${index}`}
            {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}
export default function QuestionManagerPage(): React.ReactElement {
    const { getAllQuestions, questions } = useAllQuestions();
    const [editModalIsOpen, seteditModalIsOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState<Question>();
    const [deleteModalIsOpen, setdeleteModalIsOpen] = useState(false);
    const [selected_AddQuestion, setSelected_AddQuestion] = useState<Question>({
        question_name: "",
        content: "",
        answer: ""
    });
    const [tabIndex, setTabIndex] = useState(0);
    const tab_HandleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };
    const theme = createTheme({
        palette: {
            mode: 'dark'
        }
    });
    useEffect(() => {
        getAllQuestions();
    }, []);
    const closeEditModal = () => {
        seteditModalIsOpen(false);
    };
    const openEditModal = (question: Question) => {
        setSelectedQuestion(question);
        seteditModalIsOpen(true);
    };
    const openDeletemodal = (question: Question) => {
        setSelectedQuestion(question);
        setdeleteModalIsOpen(true);
    };
    const close_deletemodal = () => {
        setdeleteModalIsOpen(false);
    }
    function tab_apply_Prop(index: number) {
        return {
            id: `question-add-tab-${index}`,
            'aria-controls': `question-add-tabpanel-${index}`,
        };
    }
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
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <h1>
                    Question Manager
                </h1>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={tabIndex} onChange={tab_HandleChange} aria-label='tab'>
                            <Tab label="通常入力" {...tab_apply_Prop(0)} />
                            <Tab label="JSON入力" {...tab_apply_Prop(1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={tabIndex} index={0}>
                        Normal Input
                        <Box sx={{ width: '100%' }}>
                            <Item>
                                <TextField margin="dense" label="問題名" fullWidth variant='standard' value={selected_AddQuestion?.question_name} 
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                                    setSelected_AddQuestion({ ...selected_AddQuestion, question_name: e.target.value })
                                }}/>
                                <TextField margin="dense" label="問い" fullWidth variant='standard' value={selected_AddQuestion?.content}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                                    setSelected_AddQuestion({ ...selected_AddQuestion, content: e.target.value })
                                }}/>
                                <TextField margin="dense" label="答え" fullWidth variant='standard'  value={selected_AddQuestion?.answer}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                                    setSelected_AddQuestion({ ...selected_AddQuestion, answer: e.target.value })
                                }}/>
                            </Item>
                            <Item>
                                <Button onClick={()=>{
                                    console.log("submit");
                                    if(selected_AddQuestion?.question_name===""||selected_AddQuestion?.content===""||selected_AddQuestion?.answer===""){
                                        alert("空白の項目があります。");
                                        return;
                                    }
                                    let request_question: Question_Req = {
                                        question_name: selected_AddQuestion?.question_name,
                                        answer: selected_AddQuestion?.answer,
                                        content: selected_AddQuestion?.content
                                    }

                                    console.log("after log:", request_question);
                                    fetch(
                                        "http://localhost:8080/api/v1/question_db/question/",
                                        {
                                            method: "POST",
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
                                }}>追加</Button>
                            </Item>
                        </Box>
                    </TabPanel>
                    <TabPanel value={tabIndex} index={1}>
                        JSON Input
                    </TabPanel>
                </Box>
                <Box sx={{ width: '100%' }}>
                    <h2>list</h2>
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
                                                openDeletemodal(question);
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
                    
                <Dialog open={deleteModalIsOpen} onClose={close_deletemodal}>
                    <DialogTitle>
                        ユーザーを削除しますか？
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {selectedQuestion?.question_name},{selectedQuestion?.uuid}を削除しますか?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={close_deletemodal}>Cancel</Button>
                        <Button onClick={() => {
                            fetch(
                                "http://localhost:8080/api/v1/question_db/question/" + selectedQuestion?.uuid,
                                {
                                    method: "DELETE"
                                }
                            ).then((rp) => {
                                getAllQuestions();
                            }, (err) => {
                                console.error(err)
                            });
                            close_deletemodal();
                        }}>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
                </Box>
            </ThemeProvider>
        </>
    );
}