import supabase from "./supabase"



export async function getCalendar () {
  

  const { data, error } = await supabase
  .from('Calendar')
  .select('*')

  if (error) {
    console.error(error)
    throw new Error('Your Calendar data could not be retrieved.')
  }

  return data

}

export async function deleteCalendar (id) {
  
const {data, error } = await supabase
.from('Calendar')
.delete()
.eq('id', id)


  if (error) {
    console.error(error)
    throw new Error('Your Calendar data could not be deleted.')
  }

  return data

}