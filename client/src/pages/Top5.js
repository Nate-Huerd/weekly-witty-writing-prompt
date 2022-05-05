import React from "react";
import { useQuery } from "@apollo/client";
import { TOP_5 } from "../utils/queries";
import Top5List from '../components/Top5List'
const TopFive = () => {
    const {loading, data} = useQuery(TOP_5)
    const stories = data?.Top5
    if(loading) {
        return (
            <div>Looking for the Top 5</div>
        )
    }
    return (
        <div>
            <h1>Top 5 Stories of the week</h1>
            <Top5List stories={stories}></Top5List>
        </div>
    )
}
export default TopFive