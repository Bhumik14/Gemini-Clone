import { createContext, useEffect, useState
 } from "react";
import run from "../config/gemini.js"; // Ensure correct path

export const Context = createContext();

const ContextProvider = ({ children }) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextword) => {
        setTimeout(() => {
            setResultData(prev=>prev+nextword);
        },75*index);
    }

    const newChat = () =>{
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async (prompt) => {
        setResultData("")
        setLoading(true);
        setShowResult(true);
        let response;
        if(prompt !== undefined){
            
            response = await run(input);
            setRecentPrompt(prompt)
        }
        else{
            setPrevPrompts(prev=>[...prev, input])
            setRecentPrompt(input)
            response = await run(input)
        }
        

        let responseArray = response.split("**");
        let newReponse="" ;
        for(let i =0;i<responseArray.length;i++){
            if(i==0 || i%2!==1){
                newReponse += responseArray[i];
            }
            else{
                newReponse += "<b>"  + responseArray[i] + "</b>";
            }
        }

        let newReponse2 = newReponse.split("*").join("</br>");
        let newResponseArray = newReponse2.split(" ");
        for(let i = 0;i<newResponseArray.length;i++){
            delayPara(i,newResponseArray[i]+" ");
        }
        setLoading(false);
        setInput("");

    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        input,
        setInput,
        showResult,
        setShowResult,
        loading,
        resultData,
        newChat
    }

    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;
