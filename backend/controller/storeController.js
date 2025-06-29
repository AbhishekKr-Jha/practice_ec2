


const prisma=require('../config/prisma_config.js')

const getStoreList=async(req,res)=>{
    try {
        
        const data=await prisma.store.findMany({
where:{
},

select:{
    store_id:true,
    address:{
        select:{
            address:true
        }
    },
    staff_store_manager_staff_idTostaff:{
    select:{
        staff_id:true,
        first_name:true,
        last_name:true
    }
    },
    inventory:{
        select:{
            _count:{
                select:{
                    rental:true
                }
            }
        }
    },
   _count:{
    select:{
        staff_staff_store_idTostore:true
    }
   }
}

        })


const finalData=data.map((item)=>{
const totalRentals=item?.inventory.reduce((acc,cur)=>acc+cur._count.rental,0)

    return {
        store_id:item?.store_id ,
        address:item?.address?.address ,
        managerId:item?.staff_store_manager_staff_idTostaff?.staff_id ,
        manager_name:item?.staff_store_manager_staff_idTostaff?.first_name + " " + item?.staff_store_manager_staff_idTostaff?.last_name,
        totalRentals,
         staffCount:item?._count?.staff_staff_store_idTostore
    }
})


return res.json({
    message: 'Stores fetched successfully!',
    storelist: finalData
})

    } catch (error) {
        console.log("The error occured is - ",error)
        res.status(500).json({
            message: error.message || "Server Error"
        })
    }
}


module.exports={ getStoreList }

