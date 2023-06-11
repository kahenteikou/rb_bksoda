import { useState } from "react";

export const useAllQuestionSet_NOnly=()=>{
    const[questionsets_nonly,setQuestionsets_nonly]=useState<Array<QuestionSet_NOnly>>([]);
    const getAllQuestionsets_nonly=()=>{
        fetch("http://localhost:8080/api/v1/question_db/question_set_ex_nonly/",{method:"GET"})
            .then((res)=>res.json())
            .then((data)=>{
                setQuestionsets_nonly(data);
            });
    };
    return{getAllQuestionsets_nonly,questionsets_nonly};
};