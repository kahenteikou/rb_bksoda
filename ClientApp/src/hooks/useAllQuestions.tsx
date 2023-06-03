import { useState } from "react";
import { Question } from "../types/Question";

export const useAllQuestions=()=>{
    const[questions,setQuestions]=useState<Array<Question>>([]);
    const getAllQuestions=()=>{
        fetch("http://localhost:8080/api/v1/question_db/question/",{method:"GET"})
            .then((res)=>res.json())
            .then((data)=>{
                setQuestions(data);
            });
    };
    return{getAllQuestions,questions};
};