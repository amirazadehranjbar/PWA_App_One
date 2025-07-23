import {useState} from "react";

const UseInstallApp = ()=>{

    const [isShowButton,setIsShowButton] = useState("");

    const hiddenButton = ()=> setIsShowButton("hidden");
    const showButton = ()=> setIsShowButton("");

    return {isShowButton ,hiddenButton , showButton};

}

export default UseInstallApp;