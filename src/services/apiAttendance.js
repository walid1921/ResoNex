import supabase from "./supabase"


export async function getAttendece() {

  const { data, error } = await supabase
  .from('AttendanceTracker')
  .select('*')

  if (error) {
    console.error(error)
    throw new Error('Your Attendece data could not be retrieved.')
  }

  return data

}