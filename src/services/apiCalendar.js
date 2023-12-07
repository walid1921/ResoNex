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