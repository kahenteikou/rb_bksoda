import { useState } from "react";
import { QuestionSet } from "../types/QuestionSet";

export const useAllQuestionSets=()=>{
    const[questionsets,setQuestionSets]=useState<Array<QuestionSet>>([]);
    const getAllQuestionSets=()=>{
        fetch("http://localhost:8080/api/v1/question_db/question_set/",{method:"GET"})
            .then((res)=>res.json())
            .then((data)=>{
                setQuestionSets(data);
            });
    };
    return{getAllQuestionSets,questionsets};
};