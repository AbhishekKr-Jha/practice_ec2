


const prisma=require('../config/prisma_config.js')

const getCategoryAndLanguageList=async(req,res)=>{
    try {
         

        const category=await prisma.category.findMany({
           where:{},
           select:{
            name:true
           } 
        })
        const language=await prisma.language.findMany({
           where:{},
           select:{
            name:true
           }
        })

        const categoryList=category.map((item)=>item?.name)
        const languageList=language.map((item)=>item?.name)

return res.json({
    message: 'List Fetched Successfully!',
    listData: {
categoryList,languageList
    }
})

    } catch (error) {
        console.log("The error occured is - ",error)
        res.status(500).json({
            message: error.message || "Server Error"
        })
    }
}


module.exports={ getCategoryAndLanguageList }