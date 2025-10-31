import "server-only"
import {cache} from "react";
import { prisma } from "../db/prisma";

// Get all categories (to filter the UI)
export const getAllCategories = cache(async()=>{
    try {
        const categories = await prisma.category.findMany({
            select :{
                id : true,
                title : true
            },
            orderBy : {
                title : "asc",
            }
        })

        return categories
    } catch(error){
        throw new Error("Failed to fetch categories")
    }
})