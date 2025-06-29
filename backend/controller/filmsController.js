

const prisma=require('../config/prisma_config.js')

const getFilms=async(req,res)=>{
    try {
         
        const {releaseyear_filter , film_length_filter_obj, film_category_filter, film_actor_first_name ,language_filter,pageNumber=1 }=req.body

                const releaseYearFilter= releaseyear_filter ? {
           release_year: releaseyear_filter
        } : {}

        const filmLengthFilter= film_length_filter_obj?.filterType ? {
            ...(film_length_filter_obj?.filterType=="greater" && {
               length:{
                gt:Number(film_length_filter_obj?.max_value)
               }
            }),
             ...(film_length_filter_obj.filterType=="lesser" && {
                  length:{
                lt:Number(film_length_filter_obj?.min_value)
               }
            }), 
             ...(film_length_filter_obj.filterType=="range" && {
                  length:{
                lte:Number(film_length_filter_obj?.range?.max_value),
                gte:Number(film_length_filter_obj?.range?.min_value)
                // lte:110,
                // gte:90
               }
            }),
        } : {}
         

        const categoryFilter=film_category_filter ? {
film_category:{
    some:{
        category:{
            name:film_category_filter
        }
    }
}
    } : {}


        const actorFilter=film_actor_first_name ? {
film_actor:{
    some:{
        actor:{
            first_name:{
                contains:film_actor_first_name
            }
        }
    }
}
    } : {}


      const languageFilter=language_filter ? {
language_film_language_idTolanguage:{
   name: language_filter
}
    } : {}


        const data=await prisma.film.findMany({
            where:{
                ...releaseYearFilter,...filmLengthFilter,...categoryFilter,...languageFilter,...actorFilter

            },
            select:{
                film_id:true,
               title:true,
               release_year:true,
               language_id:true,
replacement_cost:true,
             rating:true,
                length:true,
              language_film_language_idTolanguage:{
                select:{
                    name:true
                }
              }  
            },
            skip: 12*(pageNumber-1),
take:12
        })


        const totalFilms=await prisma.film.count({where:{
                            ...releaseYearFilter,...filmLengthFilter,...categoryFilter,...languageFilter,...actorFilter

        }})

        const totalPages = Math.ceil(totalFilms / 12);

return res.json({
    message: 'Flim List Fetched Successfully!',
    filmlist: data,
    totalPages
})

    } catch (error) {
        console.log("The error occured is - ",error)
        res.status(500).json({
            message: error.message || "Server Error"
        })
    }
}


const getFilmDetails=async(req,res)=>{
    try {
        const {id}=req.params
        console.log("the valiue is",id)

        const data=await prisma.film.findUnique({
            where:{
                film_id:Number(id)
            },
            include:{
                film_actor:{
                   where:{},
                     select:{
                        actor:{
                      select:{
                         first_name:true  ,
                         last_name:true
                      }   
                        }
                     }                  
                }
            }
        })


return res.json({
    message: 'Film Details Fetched Successfully!',
    filmdetails: data
})

    } catch (error) {
        console.log("The error occured is - ",error)
        res.status(500).json({
            message: error.message || "Server Error"
        })
    }
}


module.exports={ getFilms, getFilmDetails }

