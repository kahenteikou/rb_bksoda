import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, FormControl, IconButton, InputLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tabs, Tab, Stack, CssBaseline, Switch } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useAllQuestions } from '../hooks/useAllQuestions';
import { Question } from '../types/Question';
import { Question_Req } from '../types/Question_Req';

import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { useAllQuestionSets } from '../hooks/useAllQuestionSets';
import { useAllQuestionSet_NOnly } from '../hooks/useAllQuestionSet_NOnly';
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
            id={`questionset-add-tabpanel-${index}`}
            aria-labelledby={`questionset-add-tab-${index}`}
            {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}
export default function QuestionSetManagerPage(): React.ReactElement {
    const { getAllQuestions, questions } = useAllQuestions();
    //const { getAllQuestionSets, questionsets } = useAllQuestionSets();
    const{getAllQuestionsets_nonly,questionsets_nonly}=useAllQuestionSet_NOnly();
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
        /*
        palette: {
            mode: 'dark'
        }*/
    });
    const [JsonUUIDSwChecked,setJsonUUIDSwChecked]=useState(false);
    useEffect(() => {
        getAllQuestions();
        getAllQuestionsets_nonly();
    }, []);
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
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <h1>
                    QuestionSet Manager
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
                                {questionsets_nonly.map((questionset_n) => (
                                    <TableRow key={questionset_n.uuid}>
                                        <TableCell component="th" scope="row">
                                            {questionset_n.questionset_name}
                                        </TableCell>
                                        <TableCell align="right">{questionset_n.uuid}</TableCell>
                                        <TableCell align="right">
                                            <IconButton aria-label="edit" onClick={() => {
                                                console.log("edit: %s", questionset_n.uuid);
                                                //openEditModal(question);
                                            }}>
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton aria-label="delete" onClick={() => {
                                                console.log("delete: %s", questionset_n.uuid);
                                                //openEditmodal(user);
                                                //openDeletemodal(question);
                                            }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
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