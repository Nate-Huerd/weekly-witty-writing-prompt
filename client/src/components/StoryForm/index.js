import React from "react";
import { useMutation } from "@apollo/client";
import { ADD_STORY } from "../../utils/mutations";
const StoryForm = (author, prompt) => {
    return(
        <div>
            <h2> Start Writing!</h2>
            <form>
                <input type='text'></input>
            </form>
        </div>
    )
}
export default StoryForm